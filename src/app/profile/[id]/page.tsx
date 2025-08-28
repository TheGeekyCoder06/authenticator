export default function UserProfile({params}: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-500">Profile</h1>
        <p className="text-center text-gray-700">This is the profile page. {params.id}</p>
        
      </div>
    </div>
  );
}