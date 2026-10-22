import { useState } from "react";

type IconName =
  | "ambulance"
  | "arrow"
  | "auto"
  | "bell"
  | "call"
  | "cash"
  | "cng"
  | "headset"
  | "home"
  | "heart"
  | "location"
  | "menu"
  | "payment"
  | "pin"
  | "rickshaw"
  | "route"
  | "search"
  | "shield"
  | "star"
  | "user";

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    ambulance: <><path d="M3 10h11v7H3zM14 12h4l3 3v2h-7z"/><path d="M8.5 12v3M7 13.5h3"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    arrow: <><path d="m9 18 6-6-6-6"/></>,
    auto: <><path d="M4 16V9l2-4h10l3 5v6M4 11h15M7 8h7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8M10 20h4"/></>,
    call: <><path d="M5 4h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4c0 1-1 2-2 2C10 20 4 14 3 6c0-1 1-2 2-2Z"/></>,
    cash: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M7 6V4h14v11M7 12h.01M17 12h.01"/><circle cx="12" cy="12.5" r="2.5"/></>,
    cng: <><path d="M4 16V9l3-4h8l4 5v6M4 11h15M8 8h7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2ZM20 14h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2ZM17 20c-1 2-3 2-5 2"/></>,
    home: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    location: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    payment: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    rickshaw: <><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6l-2-7H8l-2 4M10 10V6h5l3 8"/></>,
    route: <><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5c0 2 2 3 4 3h4c2 0 4 1 4 3"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    shield: <><path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-5"/></>,
    star: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const vehicles = [
  { id: "rickshaw", name: "Rickshaw", detail: "Private · 1–2 seats", eta: "5 min", fare: "৳80", icon: "rickshaw" as IconName },
  { id: "auto", name: "Auto", detail: "Shared · up to 6", eta: "7 min", fare: "৳60", icon: "auto" as IconName, badge: "Best value" },
  { id: "cng", name: "CNG", detail: "Private · outstation", eta: "12 min", fare: "৳180", icon: "cng" as IconName },
  { id: "ambulance", name: "Ambulance", detail: "Emergency support", eta: "8 min", fare: "From ৳500", icon: "ambulance" as IconName },
];

function AppButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className={`cursor-pointer transition active:scale-[.98] ${className}`}>{children}</button>;
}

function LocationField({ label, value, end }: { label: string; value: string; end?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid size-9 shrink-0 place-items-center rounded-full ${end ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-700"}`}>
        <Icon name={end ? "pin" : "location"} className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</div>
        <div className="truncate text-sm font-semibold text-slate-800">{value}</div>
      </div>
      <AppButton className="grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100"><Icon name="search" className="size-4" /></AppButton>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<"home" | "booking" | "vehicles" | "history" | "user">("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [trackingExpanded, setTrackingExpanded] = useState(true);
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self");
  const [otherName, setOtherName] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [supportOpen, setSupportOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [selected, setSelected] = useState("auto");
  const [booked, setBooked] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState("bKash");
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const vehicle = vehicles.find((item) => item.id === selected)!;
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Good night";

  return (
    <main onClick={() => { setNotificationsOpen(false); setMenuOpen(false); }} className="min-h-screen bg-slate-50 pb-20 text-slate-950">
      <header onClick={(event) => event.stopPropagation()} className="relative z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#071f1b] px-5 text-white lg:px-10">
        <AppButton onClick={() => { setScreen("home"); setBooked(false); setSearchOpen(false); }} className="flex items-center gap-3 text-left">
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-950/20"><Icon name="route" /></div>
          <div>
            <div className="text-lg font-bold tracking-tight">Nishith</div>
            <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-300">Safe rides after dark</div>
          </div>
        </AppButton>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <AppButton onClick={() => setScreen("home")} className={screen === "home" ? "text-white" : "hover:text-white"}>Home</AppButton>
          <AppButton onClick={() => { setScreen("booking"); setSearchOpen(true); }} className={screen === "booking" ? "text-white" : "hover:text-white"}>Book a ride</AppButton>
          <AppButton className="hover:text-white">Safety</AppButton>
          <AppButton className="hover:text-white">Your trips</AppButton>
          <AppButton className="hover:text-white">Help</AppButton>
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <AppButton onClick={() => { setNotificationsOpen(!notificationsOpen); setMenuOpen(false); }} className="relative grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Icon name="bell" className="size-4" /><span className="absolute right-2 top-2 size-2 rounded-full bg-orange-400 ring-2 ring-emerald-950" /></AppButton>
            {notificationsOpen && <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><span className="text-sm font-bold">Notifications</span><span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">2 new</span></div>
              <div className="p-2">
                <div className="flex gap-3 rounded-xl bg-emerald-50 p-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-600 text-white"><Icon name="shield" className="size-4" /></span><span><span className="block text-xs font-bold">Your night ride is protected</span><span className="mt-1 block text-[11px] leading-relaxed text-slate-500">Live tracking and emergency support are active for every trip.</span><span className="mt-1 block text-[10px] text-emerald-700">2 min ago</span></span></div>
                <div className="mt-1 flex gap-3 rounded-xl p-3 hover:bg-slate-50"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600"><Icon name="payment" className="size-4" /></span><span><span className="block text-xs font-bold">bKash payment ready</span><span className="mt-1 block text-[11px] text-slate-500">Pay securely after your ride is complete.</span><span className="mt-1 block text-[10px] text-slate-400">1 hour ago</span></span></div>
              </div>
            </div>}
          </div>
          <AppButton className="hidden items-center gap-2 rounded-full bg-white/10 py-2 pl-2 pr-4 sm:flex"><span className="grid size-7 place-items-center rounded-full bg-emerald-300 text-emerald-950"><Icon name="user" className="size-4" /></span><span className="text-sm">Rahim</span></AppButton>
          <div className="relative md:hidden">
            <AppButton onClick={() => { setMenuOpen(!menuOpen); setNotificationsOpen(false); }} className="grid size-10 place-items-center rounded-full bg-white/10"><Icon name="menu" /></AppButton>
            {menuOpen && <div className="absolute right-0 top-12 w-56 rounded-2xl bg-white p-2 text-slate-900 shadow-2xl ring-1 ring-slate-200">
              {[["home","Home"],["search","Book a ride"],["shield","Safety"],["route","Your trips"],["headset","Help & support"]].map(([icon, label]) => <AppButton key={label} onClick={() => { if (label === "Home") setScreen("home"); if (label === "Book a ride") { setScreen("booking"); setSearchOpen(true); } setMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-slate-50"><Icon name={icon as IconName} className="size-4 text-emerald-700" />{label}</AppButton>)}
            </div>}
          </div>
        </div>
      </header>

      {screen === "home" && (
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl"><span className="text-emerald-700">{greeting},</span> Ashiq</div>
          <section className="relative overflow-hidden rounded-[2rem] bg-[#082b25] px-6 py-10 text-white sm:px-10 lg:min-h-[25rem] lg:px-14 lg:py-14">
            <img src="https://images.unsplash.com/photo-1711048056950-30d1592839c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" alt="A quiet Bangladesh street at night" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-transparent" />
            <div className="relative z-10 max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-200"><span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Serving Jamalpur tonight</div>
              <div className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">A safe ride is always<br className="hidden sm:block" /> within reach.</div>
              <div className="mt-4 max-w-lg text-base leading-relaxed text-emerald-100/80">Local rides to stations, villages and hospitals—available through the night with trained drivers and live tracking.</div>
              <AppButton onClick={() => setSearchOpen(true)} className="mt-8 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left text-slate-900 shadow-2xl sm:max-w-md">
                <span className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon name="search" /></span>
                <span className="flex-1"><span className="block text-xs font-semibold text-slate-400">Where to?</span><span className="block text-sm font-bold">Search station, hospital or village</span></span>
                <Icon name="arrow" className="size-4 text-slate-400" />
              </AppButton>
            </div>
          </section>

          <section id="vehicles" className="py-9">
            <div className="mb-5 flex items-end justify-between"><div><div className="text-2xl font-bold tracking-tight">Available near you</div><div className="mt-1 text-sm text-slate-500">Company-operated vehicles ready tonight</div></div><AppButton onClick={() => { setScreen("booking"); setSearchOpen(true); }} className="text-sm font-bold text-emerald-700">See all</AppButton></div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {vehicles.map((item, index) => (
                <AppButton key={item.id} onClick={() => { setSelected(item.id); setScreen("booking"); setSearchOpen(true); }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm hover:-translate-y-1 hover:shadow-lg">
                  <div className={`relative flex h-28 items-center justify-center overflow-hidden ${["bg-amber-50","bg-emerald-50","bg-cyan-50","bg-red-50"][index]}`}>
                    <div className="absolute -right-6 -top-8 size-28 rounded-full bg-white/70" />
                    <Icon name={item.icon} className={`relative size-16 ${["text-amber-700","text-emerald-700","text-cyan-700","text-red-600"][index]}`} />
                    <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-emerald-700 shadow-sm">{item.eta}</span>
                  </div>
                  <span className="flex items-center justify-between p-4"><span><span className="block text-base font-bold">{item.name}</span><span className="block text-xs text-slate-400">{item.detail}</span></span><Icon name="arrow" className="size-4 text-slate-300 group-hover:text-emerald-600" /></span>
                </AppButton>
              ))}
            </div>
          </section>

          <section className="grid gap-4 pb-10 lg:grid-cols-[1.4fr_1fr]">
            <div id="history" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-5 flex items-center justify-between"><div className="text-lg font-bold">Recent rides</div><AppButton className="text-xs font-bold text-emerald-700">View history</AppButton></div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Icon name="route" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">Jamalpur Railway Station</span><span className="block text-xs text-slate-400">From Medical Road · 14 Jun, 11:42 PM</span></span>
                <span className="text-right"><span className="block text-sm font-bold">৳60</span><span className="block text-[10px] font-bold text-emerald-600">Completed</span></span>
              </div>
            </div>
            <div className="rounded-3xl bg-orange-50 p-6 ring-1 ring-orange-100">
              <div className="mb-4 text-lg font-bold">Built for night-time safety</div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[[ "shield", "Verified crew" ], [ "location", "Live GPS" ], [ "headset", "24/7 support" ]].map(([icon, label]) => <div key={label} className="rounded-2xl bg-white/70 p-3"><Icon name={icon as IconName} className="mx-auto size-5 text-orange-600" /><div className="mt-2 text-[11px] font-bold text-slate-700">{label}</div></div>)}
              </div>
            </div>
          </section>
          <section className="mb-8 rounded-3xl bg-[#082b25] p-5 text-white">
            <div className="mb-4"><div className="text-lg font-bold">Night safety desk</div><div className="text-xs text-emerald-100/60">Live help for Jamalpur district</div></div>
            <div className="grid gap-2 sm:grid-cols-4">
              <AppButton onClick={() => { window.location.href = "tel:999"; }} className="flex items-center gap-3 rounded-2xl bg-red-500 p-3 text-left"><Icon name="call" className="size-5" /><span><span className="block text-[10px] text-red-100">Police hotline</span><span className="block text-sm font-bold">999</span></span></AppButton>
              <AppButton onClick={() => { window.location.href = "tel:09612345678"; }} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"><Icon name="call" className="size-5 text-emerald-300" /><span><span className="block text-[10px] text-white/50">District hotline</span><span className="block text-sm font-bold">09612-345678</span></span></AppButton>
              <AppButton onClick={() => { setScreen("booking"); setSearchOpen(true); }} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"><Icon name="location" className="size-5 text-emerald-300" /><span><span className="block text-[10px] text-white/50">GPS status</span><span className="flex items-center gap-1 text-sm font-bold"><span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live now</span></span></AppButton>
              <AppButton onClick={() => setSupportOpen(true)} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15"><Icon name="headset" className="size-5 text-emerald-300" /><span><span className="block text-[10px] text-white/50">Control room</span><span className="block text-sm font-bold">Open 24/7</span></span></AppButton>
            </div>
          </section>
        </div>
      )}

      {screen === "vehicles" && <section className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-8"><div className="text-3xl font-bold tracking-tight">Available vehicles</div><div className="mt-2 text-sm text-slate-500">Live availability from our Jamalpur fleet</div></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{vehicles.map((item, index) => <div key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"><div className={`grid h-40 place-items-center ${["bg-amber-50","bg-emerald-50","bg-cyan-50","bg-red-50"][index]}`}><Icon name={item.icon} className={`size-20 ${["text-amber-700","text-emerald-700","text-cyan-700","text-red-600"][index]}`} /></div><div className="p-5"><div className="flex items-start justify-between"><div><div className="text-lg font-bold">{item.name}</div><div className="text-xs text-slate-400">{item.detail}</div></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{item.eta}</span></div><div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">{item.fare}</span><AppButton onClick={() => { setSelected(item.id); setScreen("booking"); setSearchOpen(true); }} className="rounded-xl bg-emerald-900 px-4 py-2 text-xs font-bold text-white">Book now</AppButton></div></div></div>)}</div>
      </section>}

      {screen === "history" && <section className="mx-auto min-h-[calc(100vh-5rem)] max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-8"><div className="text-3xl font-bold tracking-tight">Ride history</div><div className="mt-2 text-sm text-slate-500">Your recent night journeys and payments</div></div>
        <div className="space-y-3">{[["Jamalpur Railway Station","Medical Road","14 Jun, 11:42 PM","৳60","Auto"],["Jamalpur General Hospital","Mymensingh Road","08 Jun, 1:15 AM","৳180","CNG"],["Islampur Bus Terminal","Bazar Road","29 May, 10:30 PM","৳80","Rickshaw"]].map(([to,from,date,fare,type]) => <div key={date} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Icon name="route" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{to}</span><span className="block text-xs text-slate-400">From {from} · {date}</span></span><span className="text-right"><span className="block text-sm font-bold">{fare}</span><span className="block text-[10px] text-emerald-600">{type} · Completed</span></span></div>)}</div>
      </section>}

      {screen === "user" && <section className="mx-auto min-h-[calc(100vh-5rem)] max-w-3xl px-5 py-10 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="bg-[#082b25] p-7 text-white"><div className="flex items-center gap-4"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=face&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=200" alt="Ashiq profile" className="size-20 rounded-full object-cover ring-4 ring-emerald-300/30" /><div><div className="text-2xl font-bold">Ashiq</div><div className="mt-1 text-sm text-emerald-200">Verified Nishith member</div></div></div></div>
          <div className="space-y-5 p-6"><div><div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mobile number</div><div className="mt-1 text-sm font-semibold">+880 1712-345678</div></div><div className="border-t border-slate-100 pt-5"><div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Home address</div><div className="mt-1 text-sm font-semibold">Sheikh Hasina Medical Road, Jamalpur</div></div><div className="border-t border-slate-100 pt-5"><div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Office address</div><div className="mt-1 text-sm font-semibold">Station Road, Jamalpur Sadar</div></div><div className="border-t border-slate-100 pt-5"><div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Emergency contact</div><div className="mt-1 text-sm font-semibold">Rafiq · +880 1812-987654</div></div><AppButton className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-700">Edit profile information</AppButton></div>
        </div>
      </section>}

      {screen === "booking" && (
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        <div className="absolute inset-0 bg-[#dce4df]">
          <svg className="h-full w-full" viewBox="0 0 1400 820" preserveAspectRatio="xMidYMid slice" aria-label="Map showing route from home to Jamalpur Railway Station">
            <rect width="1400" height="820" fill="#dfe8e2" />
            <path d="M0 150 280 90l170 120 280-80 270 100 400-120M0 620l260-100 160 80 300-100 300 80 380-160M180 0l40 820M720 0l-60 820M1120 0l80 820" stroke="#cbd7d0" strokeWidth="58" fill="none"/>
            <path d="M0 150 280 90l170 120 280-80 270 100 400-120M0 620l260-100 160 80 300-100 300 80 380-160M180 0l40 820M720 0l-60 820M1120 0l80 820" stroke="#f8faf9" strokeWidth="32" fill="none"/>
            <path d="M90 320h260v130H90zM390 290h210v140H390zM770 340h220v130H770zM1020 90h220v150h-220zM900 620h260v140H900z" fill="#c9d9cf" opacity=".75"/>
            <path d="M410 685 C550 550 610 575 735 435 S950 390 1080 205" stroke="#0f8b6d" strokeWidth="7" fill="none" strokeDasharray="3 12" strokeLinecap="round"/>
            <circle cx="410" cy="685" r="14" fill="#fff" stroke="#0f8b6d" strokeWidth="7"/>
            <circle cx="1080" cy="205" r="14" fill="#fff" stroke="#f97316" strokeWidth="7"/>
            <g transform="translate(735 418)">
              <circle r="29" fill="#073c33" stroke="#fff" strokeWidth="5"/>
              <path d="M-12 7v-12l6-7H7l9 9v10M-12 0h28" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <circle cx="-6" cy="8" r="4" fill="#34d399"/><circle cx="11" cy="8" r="4" fill="#34d399"/>
            </g>
            <g fontFamily="system-ui" fontWeight="600" fontSize="15" fill="#54645c">
              <text x="1060" y="165">Jamalpur Railway Station</text>
              <text x="345" y="735">Sheikh Hasina Medical Road</text>
              <text x="770" y="315">Station Road</text>
              <text x="980" y="560">Jamalpur General Hospital</text>
            </g>
          </svg>
          <div className="absolute right-5 top-5 flex flex-col gap-2">
            <AppButton className="grid size-11 place-items-center rounded-xl bg-white text-slate-700 shadow-lg hover:text-emerald-700"><span className="text-xl font-medium">+</span></AppButton>
            <AppButton className="grid size-11 place-items-center rounded-xl bg-white text-slate-700 shadow-lg hover:text-emerald-700"><span className="text-xl font-medium">−</span></AppButton>
            <AppButton className="mt-1 grid size-11 place-items-center rounded-xl bg-white text-emerald-700 shadow-lg"><Icon name="location" /></AppButton>
          </div>
          <div className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-full bg-[#071f1b] px-4 py-2 text-xs font-semibold text-white shadow-xl sm:flex">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Live vehicle tracking
          </div>
          {booked && <><div className="absolute bottom-[13%] left-[27%] rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-lg ring-2 ring-emerald-500"><span className="mr-1.5 inline-block size-2 rounded-full bg-emerald-500" />You · location shared</div><div className="absolute left-[53%] top-[42%] rounded-full bg-emerald-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg"><span className="mr-1.5 inline-block size-2 rounded-full bg-orange-400 animate-pulse" />Driver · live</div></>}
        </div>

        <aside className={`relative z-10 m-3 w-[calc(100%-1.5rem)] rounded-3xl bg-white shadow-2xl shadow-slate-900/20 transition-all sm:m-5 sm:max-w-md lg:m-8 ${booked && !trackingExpanded ? "max-w-xs" : ""}`}>
          <div className="border-b border-slate-100 px-5 pb-5 pt-6 sm:px-6">
            <div className="mb-1 flex items-center justify-between">
              <div className="text-xl font-bold tracking-tight">{booked ? "Your ride is on the way" : "Where are you going?"}</div>
              {booked ? <AppButton onClick={() => setTrackingExpanded(!trackingExpanded)} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{trackingExpanded ? "Minimize map card" : "Expand details"}</AppButton> : <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> 24/7 active</div>}
            </div>
            <div className="text-sm text-slate-500">{booked ? `${vehicle.name} • Driver arrives in ${vehicle.eta}` : "Reliable local transport, even after midnight."}</div>
          </div>

          {booked ? (
            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex items-center gap-4 rounded-2xl bg-emerald-950 p-4 text-white">
                <div className="grid size-14 place-items-center rounded-2xl bg-emerald-400 text-emerald-950"><Icon name={vehicle.icon} className="size-7" /></div>
                <div className="flex-1"><div className="font-bold">Mizanur Rahman</div><div className="mt-1 flex items-center gap-1 text-xs text-emerald-100"><Icon name="star" className="size-3 fill-amber-400 text-amber-400" /> 4.9 · 327 night trips</div></div>
                <AppButton onClick={() => setCallOpen(true)} className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Icon name="call" /></AppButton>
              </div>
              {!trackingExpanded ? <AppButton onClick={() => setTrackingExpanded(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-xs font-bold text-emerald-700"><Icon name="location" className="size-4" /> Open live trip details</AppButton> : <>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-400">Arrives</div><div className="mt-1 text-sm font-bold">{vehicle.eta}</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-400">Vehicle</div><div className="mt-1 text-sm font-bold">JAM-14</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-400">Fare</div><div className="mt-1 text-sm font-bold">{vehicle.fare}</div></div>
              </div>
              <div className="flex gap-3">
                <AppButton className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><Icon name="shield" className="size-4" /> Share trip</AppButton>
                <AppButton onClick={() => setSupportOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><Icon name="headset" className="size-4" /> Support</AppButton>
              </div>
              <AppButton onClick={() => setCompleted(true)} className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600">Demo: Complete ride</AppButton>
              <AppButton onClick={() => setBooked(false)} className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-700">Cancel booking</AppButton>
              </>}
            </div>
          ) : (
            <>
              <div className="space-y-4 px-5 py-5 sm:px-6">
                <LocationField label="Pick up" value="Sheikh Hasina Medical Road" />
                <div className="ml-[18px] h-3 border-l border-dashed border-slate-300" />
                <LocationField label="Destination" value="Jamalpur Railway Station" end />
              </div>
              <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
                <div className="mb-3">
                  <div className="flex items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">A</span><span className="truncate text-xs font-bold text-slate-700">{bookingFor === "self" ? "For Ashiq" : "For another person"}</span></div><div className="flex shrink-0 rounded-lg bg-slate-100 p-0.5"><AppButton onClick={() => setBookingFor("self")} className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${bookingFor === "self" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}>Myself</AppButton><AppButton onClick={() => setBookingFor("other")} className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${bookingFor === "other" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}>Other</AppButton></div></div>
                  {bookingFor === "other" && <div className="mt-2 grid grid-cols-2 gap-2"><input value={otherName} onChange={(event) => setOtherName(event.target.value)} placeholder="Passenger name" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500" /><input value={otherPhone} onChange={(event) => setOtherPhone(event.target.value)} placeholder="Mobile number" className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500" /></div>}
                </div>
                <div className="mb-3 flex items-center justify-between"><div className="text-sm font-bold text-slate-900">Choose your ride</div><div className="text-xs text-slate-400">3.8 km · est. 18 min</div></div>
                <div className="space-y-2">
                  {vehicles.map((item) => (
                    <AppButton key={item.id} onClick={() => setSelected(item.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left ${selected === item.id ? "border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600" : "border-slate-100 hover:border-slate-300"}`}>
                      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${selected === item.id ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-600"}`}><Icon name={item.icon} className="size-6" /></span>
                      <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="text-sm font-bold">{item.name}</span>{item.badge && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">{item.badge}</span>}</span><span className="mt-0.5 block text-[11px] text-slate-400">{item.detail} · {item.eta} away</span></span>
                      <span className="text-sm font-bold">{item.fare}</span>
                    </AppButton>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
                <div className="mb-4 flex items-center justify-between">
                  <AppButton onClick={() => setPaymentOpen(!paymentOpen)} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><span className="grid size-8 place-items-center rounded-lg bg-violet-50 text-violet-600"><Icon name="payment" className="size-4" /></span> {payment} <Icon name="arrow" className="size-3 text-slate-400" /></AppButton>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400"><Icon name="shield" className="size-3.5 text-emerald-600" /> Safety verified</div>
                </div>
                {paymentOpen && <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-2">{["Cash", "bKash", "Nagad", "Bank card"].map((method) => <AppButton key={method} onClick={() => { setPayment(method); setPaymentOpen(false); }} className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-bold ${payment === method ? "border-emerald-500 bg-white text-emerald-700" : "border-transparent text-slate-600 hover:bg-white"}`}><span className={`size-2 rounded-full ${payment === method ? "bg-emerald-500" : "bg-slate-300"}`} />{method}</AppButton>)}</div>}
                <AppButton onClick={() => { setBooked(true); setTrackingExpanded(true); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Book {vehicle.name} · {vehicle.fare}<Icon name="arrow" className="size-4" /></AppButton>
                <div className="mt-3 text-center text-[10px] leading-relaxed text-slate-400">Cash, bKash, Nagad & bank cards accepted · No hidden fees</div>
              </div>
            </>
          )}
        </aside>

        <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-5 rounded-2xl bg-white px-5 py-3 shadow-xl lg:flex">
          <div className="flex items-center gap-3 border-r border-slate-200 pr-5"><span className="grid size-9 place-items-center rounded-full bg-red-50 text-red-600"><Icon name="headset" className="size-4" /></span><span><span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Emergency support</span><span className="block text-sm font-bold">09612-246-247</span></span></div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><Icon name="shield" className="size-4 text-emerald-600" /> Trained drivers · GPS tracked · SOS ready</div>
        </div>
      </section>
      )}

      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-20 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
        <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <div className="border-b border-slate-100 p-5">
            <div className="mb-4 flex items-center justify-between"><div><div className="text-xl font-bold">Plan your night ride</div><div className="text-xs text-slate-400">Choose a safe pickup and destination</div></div><AppButton onClick={() => setSearchOpen(false)} className="grid size-9 place-items-center rounded-full bg-slate-100 text-lg text-slate-500">×</AppButton></div>
            <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
              <LocationField label="Pickup" value="Your current location" />
              <div className="border-t border-slate-100" />
              <LocationField label="Where to?" value="Search destination" end />
            </div>
          </div>
          <div className="p-3">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Popular nearby</div>
            {[["Jamalpur Railway Station","Station Road · 3.8 km"],["Jamalpur General Hospital","Medical Road · 2.2 km"],["Islampur Bus Terminal","Islampur Road · 8.5 km"]].map(([name, meta]) => <AppButton key={name} onClick={() => { setSearchOpen(false); setScreen("booking"); }} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left hover:bg-slate-50"><span className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon name="pin" className="size-4" /></span><span className="flex-1"><span className="block text-sm font-bold">{name}</span><span className="block text-xs text-slate-400">{meta}</span></span><Icon name="arrow" className="size-4 text-slate-300" /></AppButton>)}
          </div>
        </div>
      </div>}

      {completed && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="shield" className="size-8" /></div>
          <div className="mt-4 text-2xl font-bold">You arrived safely</div>
          <div className="mt-2 text-sm text-slate-500">How was your ride with Mizanur?</div>
          <div className="my-6 flex justify-center gap-2">{[1,2,3,4,5].map((star) => <AppButton key={star} onClick={() => setRating(star)} className={`${star <= rating ? "text-amber-400" : "text-slate-200"}`}><Icon name="star" className={`size-8 ${star <= rating ? "fill-amber-400" : ""}`} /></AppButton>)}</div>
          <textarea placeholder="Share feedback (optional)" className="h-24 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-emerald-500" />
          <AppButton onClick={() => { setCompleted(false); setBooked(false); setScreen("home"); setRating(0); }} className="mt-4 w-full rounded-2xl bg-emerald-900 py-3.5 text-sm font-bold text-white">Submit review</AppButton>
          <AppButton onClick={() => { setCompleted(false); setBooked(false); setScreen("home"); }} className="mt-3 text-xs font-semibold text-slate-400">Skip for now</AppButton>
        </div>
      </div>}

      {callOpen && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#041713] p-4 text-white">
        <div className="flex min-h-[34rem] w-full max-w-sm flex-col items-center rounded-[2rem] border border-white/10 bg-gradient-to-b from-emerald-900 to-[#061d19] p-7 text-center shadow-2xl">
          <div className="flex w-full items-center justify-between text-xs text-emerald-200"><span>Encrypted in-app call</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Free</span></div>
          <div className="relative mt-14">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
            <div className="relative grid size-28 place-items-center rounded-full bg-emerald-300 text-4xl font-bold text-emerald-950 ring-8 ring-white/10">MR</div>
          </div>
          <div className="mt-7 text-2xl font-bold">Mizanur Rahman</div>
          <div className="mt-2 text-sm font-medium text-emerald-200">Calling driver...</div>
          <div className="mt-1 text-xs text-white/50">No mobile balance required</div>
          <div className="mt-auto w-full rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-left">
            <div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-300 text-amber-950"><Icon name="shield" className="size-4" /></span><span><span className="block text-sm font-bold text-amber-100">Driver is currently driving</span><span className="mt-1 block text-xs leading-relaxed text-amber-100/70">For everyone’s safety, Mizanur can receive your call after the vehicle stops. Your call will remain waiting.</span></span></div>
          </div>
          <AppButton onClick={() => setCallOpen(false)} className="mt-6 grid size-16 place-items-center rounded-full bg-red-500 shadow-lg shadow-red-950/40 hover:bg-red-600"><Icon name="call" className="size-7 rotate-[135deg]" /></AppButton>
          <div className="mt-3 text-xs text-white/50">End call</div>
        </div>
      </div>}

      {supportOpen && <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={() => setSupportOpen(false)}>
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-start justify-between"><div><div className="text-xl font-bold">Control room & safety</div><div className="mt-1 text-xs text-slate-500">Real people are available throughout your ride.</div></div><AppButton onClick={() => setSupportOpen(false)} className="grid size-9 place-items-center rounded-full bg-slate-100 text-lg">×</AppButton></div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <AppButton onClick={() => { window.location.href = "https://wa.me/8801712345678"; }} className="rounded-2xl bg-emerald-50 p-3 text-center text-emerald-800"><Icon name="headset" className="mx-auto size-5" /><span className="mt-2 block text-[11px] font-bold">WhatsApp</span></AppButton>
            <AppButton onClick={() => { window.location.href = "tel:999"; }} className="rounded-2xl bg-red-50 p-3 text-center text-red-700"><Icon name="call" className="mx-auto size-5" /><span className="mt-2 block text-[11px] font-bold">Police 999</span></AppButton>
            <AppButton onClick={() => { window.location.href = "tel:09612345678"; }} className="rounded-2xl bg-blue-50 p-3 text-center text-blue-700"><Icon name="call" className="mx-auto size-5" /><span className="mt-2 block text-[11px] font-bold">District line</span></AppButton>
          </div>
          <div className="mt-5 text-xs font-bold text-slate-700">Report an issue to control room</div>
          <div className="mt-2 flex flex-wrap gap-2">{["Asked for extra money","Taking unknown route","Vehicle not arrived"].map((issue) => <AppButton key={issue} className="rounded-full bg-slate-100 px-3 py-2 text-[10px] font-semibold text-slate-600 hover:bg-orange-50 hover:text-orange-700">{issue}</AppButton>)}</div>
          <textarea placeholder="Write a custom message..." className="mt-3 h-24 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-emerald-500" />
          <AppButton onClick={() => setMessageSent(true)} className="mt-3 w-full rounded-2xl bg-emerald-900 py-3 text-sm font-bold text-white">{messageSent ? "Message sent to control room" : "Send message now"}</AppButton>
          {messageSent && <div className="mt-2 text-center text-[11px] font-semibold text-emerald-700">A support officer will reply in this chat shortly.</div>}
        </div>
      </div>}

      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Nishith. Made with <Icon name="heart" className="mx-1 inline size-3 fill-red-500 text-red-500" /> by <a href="http://www.arslytech.com/" target="_blank" rel="noreferrer" className="font-bold text-emerald-700">Arsly Tech</a></footer>
      <nav onClick={(event) => event.stopPropagation()} className="fixed inset-x-3 bottom-2 z-40 mx-auto flex max-w-xs items-center justify-around rounded-2xl border border-slate-200 bg-white/95 p-1 shadow-2xl backdrop-blur">
        {[["home","Home","home"],["auto","Vehicles","vehicles"],["route","History","history"],["user","User","user"]].map(([icon,label,target]) => <AppButton key={label} onClick={() => { setScreen(target as "home" | "vehicles" | "history" | "user"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex min-w-14 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[9px] font-bold ${screen === target ? "bg-emerald-50 text-emerald-700" : "text-slate-400 hover:text-emerald-700"}`}><Icon name={icon as IconName} className="size-4" />{label}</AppButton>)}
      </nav>
    </main>
  );
}
