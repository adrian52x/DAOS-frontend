import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
//https://www.npmjs.com/package/react-loading-skeleton

export const LoadingHeader = () => (
    <div className="flex gap-4">
        <Skeleton width={200} height={40} borderRadius={12} />
        <Skeleton width={200} height={40} borderRadius={12} />
    </div>
);