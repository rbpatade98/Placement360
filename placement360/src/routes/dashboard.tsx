const Dashboard = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-foreground">Active Applications</h3>
          <p className="text-4xl font-extrabold mt-2 text-primary">12</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-foreground">Upcoming Interviews</h3>
          <p className="text-4xl font-extrabold mt-2 text-primary">3</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-foreground">Offers Received</h3>
          <p className="text-4xl font-extrabold mt-2 text-primary">1</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
