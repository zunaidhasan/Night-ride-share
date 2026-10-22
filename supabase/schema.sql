-- Nishith Night Ride Share - Supabase Schema
-- Run in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'rider' CHECK (role IN ('rider', 'driver', 'admin')),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('auto', 'cng', 'rickshaw', 'ambulance')),
  plate_number TEXT UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  current_location GEOGRAPHY(POINT, 4326),
  base_fare NUMERIC(10,2) NOT NULL DEFAULT 30,
  per_km_rate NUMERIC(10,2) NOT NULL DEFAULT 15,
  min_fare NUMERIC(10,2) NOT NULL DEFAULT 40,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicles_type ON public.vehicles(type);
CREATE INDEX idx_vehicles_available ON public.vehicles(is_available) WHERE is_available = true;
CREATE INDEX idx_vehicles_location ON public.vehicles USING GIST(current_location);

CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('auto', 'cng', 'rickshaw', 'ambulance')),
  pickup_address TEXT NOT NULL,
  pickup_location GEOGRAPHY(POINT, 4326) NOT NULL,
  dropoff_address TEXT NOT NULL,
  dropoff_location GEOGRAPHY(POINT, 4326) NOT NULL,
  is_for_other BOOLEAN NOT NULL DEFAULT false,
  other_person_name TEXT,
  other_person_phone TEXT,
  status TEXT NOT NULL DEFAULT 'searching'
    CHECK (status IN ('searching', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled')),
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancel_reason TEXT,
  estimated_fare NUMERIC(10,2) NOT NULL,
  final_fare NUMERIC(10,2),
  distance_km NUMERIC(8,2),
  duration_minutes INTEGER,
  payment_method TEXT NOT NULL DEFAULT 'cash'
    CHECK (payment_method IN ('bkash', 'nagad', 'cash', 'card')),
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rides_rider ON public.rides(rider_id);
CREATE INDEX idx_rides_driver ON public.rides(driver_id);
CREATE INDEX idx_rides_status ON public.rides(status);

CREATE TABLE public.ride_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ride_id UUID NOT NULL REFERENCES public.rides(id) ON DELETE CASCADE,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  heading REAL,
  speed REAL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ride_id UUID REFERENCES public.rides(id) ON DELETE SET NULL,
  issue_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_reply TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, email, full_name)
  VALUES (NEW.id, NEW.phone, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Nearby vehicles (PostGIS)
CREATE OR REPLACE FUNCTION public.nearby_vehicles(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_meters DOUBLE PRECISION DEFAULT 5000,
  vehicle_type_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID, name TEXT, type TEXT, plate_number TEXT, driver_id UUID,
  distance_meters DOUBLE PRECISION, base_fare NUMERIC, per_km_rate NUMERIC, min_fare NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT v.id, v.name, v.type, v.plate_number, v.driver_id,
    ST_Distance(v.current_location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography),
    v.base_fare, v.per_km_rate, v.min_fare
  FROM public.vehicles v
  WHERE v.is_available = true AND v.current_location IS NOT NULL
    AND ST_DWithin(v.current_location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography, radius_meters)
    AND (vehicle_type_filter IS NULL OR v.type = vehicle_type_filter)
  ORDER BY 6 ASC LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Riders can view own rides" ON public.rides FOR SELECT USING (auth.uid() = rider_id OR auth.uid() = driver_id);
CREATE POLICY "Riders can create rides" ON public.rides FOR INSERT WITH CHECK (auth.uid() = rider_id);
CREATE POLICY "Users can manage own tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.rides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ride_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
