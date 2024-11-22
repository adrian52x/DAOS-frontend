export function Ensembles({ userId }: { userId: string }) {
    // fetch the ensembles data here based on the userId
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">My Ensembles</h2>
        <p>Ensembles will be fetched based on user ID: {userId}</p>
      </div>
    )
  }
  