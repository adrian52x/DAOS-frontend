import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from '/src/styles/globalStyles.module.css';
import { Button } from '../elements/Button';

export const LoadingPosts = () => (
    <div className={styles.sectionWrapper}>		
			{/* Posts data */}
			<div>
				<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">All posts</h2>
                <h3 className="text-gray-800"># posts found</h3>
			</div>

			{/* Search input */}
			<div className="flex justify-between">
				<div className='flex items-center space-x-2'>
                    <Skeleton width={210} height={40} borderRadius={12} />
                    <Skeleton width={35} height={35} borderRadius={12} />
				</div>

                <div className="flex gap-2">
                    <Skeleton width={35} height={35} borderRadius={12} />
                    <Skeleton width={130} height={35} borderRadius={12} />
                    <Skeleton width={130} height={35} borderRadius={12} />
                </div>
                
			</div>

			
			<div className="flex space-x-[50px]">
				{/* Instrument dropdown */}
				<div className='space-y-6'>
					<div className="flex space-x-[110px] items-center">
						<h2 className="font-header text-blue-800 font-medium text-xl">Instrument</h2>
					</div>
					<Skeleton className='mt-6' width={210} height={40} borderRadius={12} />
				</div>

				{/* Genre dropdown */}
				<div className='space-y-6'>
					<div className="flex space-x-[150px] items-center">
						<h2 className="font-header text-blue-800 font-medium text-xl">Genre</h2>
					</div>
					<Skeleton className='mt-6' width={210} height={40} borderRadius={12} />
				</div>
			</div>
			
            <div>
			    <Button variant="primary">Create post</Button>
            </div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} width={400} height={200} borderRadius={12} />
                ))}
			</div>
		</div>
	);