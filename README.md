# Nishith — Night Ride Share App

**Safe night rides across Jamalpur district.**

Production-ready Flutter app with Supabase backend for a localized night ride-sharing service (Auto, CNG, Rickshaw, Ambulance).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Flutter 3.24+ · Riverpod · GoRouter · Freezed |
| **Backend** | Supabase (Auth, Postgres + PostGIS, Realtime, Storage) |
| **Maps** | Google Maps Flutter (to be configured) |
| **Payments** | bKash / Nagad / Cash (integration ready) |

---

## Features

### Rider App
- Phone OTP authentication (Bangladesh numbers)
- Home dashboard with live vehicle availability
- Full booking flow (self or for someone else)
- Vehicle types: Auto · CNG · Rickshaw · Ambulance
- Real-time ride status & tracking UI
- Ride history + ratings
- Night Safety Desk (999, district hotline, control room)
- Issue reporting to control room
- Profile & emergency contacts

### Backend (Supabase)
- Profiles with roles (rider / driver / admin)
- Vehicles with live location (PostGIS)
- Full ride lifecycle
- Ride tracking points
- Support tickets
- Row Level Security (RLS)
- Realtime subscriptions
- Nearby vehicle search function

---

## Setup Instructions

### 1. Prerequisites
- Flutter 3.24+ installed
- A free [Supabase](https://supabase.com) account
- (Optional) Google Maps API key

### 2. Clone & Install

```bash
cd Night-ride-share
flutter pub get
```

### 3. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → Run
3. Go to **Authentication → Providers** → enable **Phone**
4. (Recommended) Configure an SMS provider (Twilio / MessageBird) for OTP

### 4. Configure Credentials

Edit `lib/core/network/supabase_client.dart` with your project URL and anon key.

### 5. Generate Freezed code

```bash
dart run build_runner build --delete-conflicting-outputs
```

### 6. Run

```bash
flutter run
```

---

Made for Jamalpur nights.
