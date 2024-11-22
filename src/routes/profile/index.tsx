import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '../../auth/AuthContext'
import { UserHeader } from '../../components/profile/UserHeader'
import { ProfileText } from '../../components/profile/ProfileText'
import { Instruments } from '../../components/profile/Instruments'
import { Ensembles } from '../../components/profile/Ensembles'
import { Posts } from '../../components/profile/Posts'

export const Route = createFileRoute('/profile/')({
  component: Profile,
})

function Profile() {
    const { user, loading } = useAuth()
    console.log('user', user)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div>
        <div className="container mx-auto p-4 space-y-8">
            <UserHeader user={user} />
            <ProfileText text={user.profileText} />
            <Instruments instruments={user.instruments} />
            <Ensembles userId={user._id} />
            <Posts userId={user._id} />
        </div>
        <Outlet />
        </div>
    )
}
