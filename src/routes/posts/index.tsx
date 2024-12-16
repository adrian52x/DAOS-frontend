import { useEffect, useState } from 'react';
import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { PostCard } from '../../components/PostCardMine';
import { Post } from '../../types/types';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';
import { InputField } from '../../components/elements/InputField';
import { Dropdown } from '../../components/Dropdown';
import { TagFilter } from '../../components/elements/Tag-Filter'; 

import { instrumentsList, genresList, postsTypeList } from '../../types/data';

type PostFilters = {
	title?: string;
	instrument?: string;
	genre?: string;
	//type?: string;
};

export const Route = createFileRoute('/posts/')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): PostFilters => {
		return {
			title: search.title as string,
			instrument: search.instrument as string,
			genre: search.genre as string,
			//type: search.type as string,
		};
	},
});

function RouteComponent() {

	// Query Parameters docs
	// https://leonardomontini.dev/tanstack-router-query-params/
	const { title, instrument, genre } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	const [searchText, setSearchText] = useState<string>(title || ''); // State for the search input
	const [selectedInstrument, setSelectedInstrument] = useState<string | null>(instrument || null);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(genre || null);
	const [activePostType, setActivePostType] = useState<string>(postsTypeList[0]); 

	const [fetchTrigger, setFetchTrigger] = useState<boolean>(false); // State to trigger fetch

	const fetchPosts = async () => {
		setLoading(true);
		try {
		  const response = await fetch('http://localhost:3000/api/posts/filter', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  type: activePostType,
			  title: searchText, 
			  instrument: selectedInstrument,
			  genre: selectedGenre,
			}),
		  });
		  const data = await response.json();
		  console.log('data', data);
		  
		  setPosts(data);
		} catch (error) {
		  console.error('Error fetching posts:', error);
		} finally {
		  setLoading(false);
		}
	};

	const updateFiltersURL = (name: keyof PostFilters, value: unknown) => {
		navigate({ search: (prev) => ({ ...prev, [name]: value }) });
	};
	const deleteFiltersURL = (name: keyof PostFilters) => {
		navigate({ search: (prev) => {
			const newSearch = { ...prev };
			delete newSearch[name];
			return newSearch;
		}});
	};


	
	useEffect(() => {
		fetchPosts();
	}, [fetchTrigger, selectedInstrument, selectedGenre, activePostType]); // Re-fetch posts when fetchTrigger changes

	// Search input
	const handleSearch = () => {
		updateFiltersURL('title', searchText); // Update the URL with the searchTitle
		setFetchTrigger((prev) => !prev); // Toggle fetchTrigger to re-fetch posts
	};
	const handleSearchClear = () => {
		if (title) {
			deleteFiltersURL('title');
			setFetchTrigger((prev) => !prev)
		}
		setSearchText('');
	};

	// Instrument query parameter
	const instrumentChange = (value: string) => {
		updateFiltersURL('instrument', value);
		setSelectedInstrument(value);
	};
	const instrumentClear = () => {
		deleteFiltersURL('instrument');
		setSelectedInstrument(null);
	}	

	// Genre query parameter
	const genreChange = (value: string) => {
		updateFiltersURL('genre', value);
		setSelectedGenre(value);
	};
	const genreClear = () => {
		deleteFiltersURL('genre');
		setSelectedGenre(null);
	}	

	
	if (loading) {
		return <div className="text-center text-gray-600">Loading posts...</div>;
	}

	return (
		<div className={styles.sectionWrapper}>
			{/* {JSON.stringify({ title, instrument, genre })} */}
			
			{/* Posts data */}
			<div>
				<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">All posts</h2>
				<h3 className="text-gray-800">{posts.length} posts found</h3>
			</div>

			{/* Search input */}
			<div className="flex justify-between">
				<div className='flex items-center space-x-2'>
					<InputField placeholder='Search by keywords' name="search" onChange={(e) => setSearchText(e.target.value)} value={searchText}></InputField>
					<button
						onClick={handleSearch} // Toggle fetchTrigger to re-fetch posts
						className="px-2 py-1 bg-blue-600 text-white rounded-md flex items-center justify-center"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
						</svg>
					</button>
					{searchText && (
						<Button variant="tertiary" onClick={handleSearchClear}>Clear</Button>
					)}
				</div>
				
				{/* Post Type filter */}
				<TagFilter filters={postsTypeList} activePostType={activePostType} setActivePostType={setActivePostType} />
			</div>

			
			<div className="flex space-x-[50px]">
				{/* Instrument dropdown */}
				<div className='space-y-6'>
					<div className="flex space-x-[110px] items-center">
						<h2 className="font-header text-blue-800 font-medium text-xl">Instrument</h2>
						{selectedInstrument && (
							<Button variant="tertiary" onClick={instrumentClear}>Clear</Button>
						)}
					</div>
					<Dropdown options={instrumentsList} placeholder="Select instrument" value={selectedInstrument} onChange={instrumentChange} />
				</div>

				{/* Genre dropdown */}
				<div className='space-y-6'>
					<div className="flex space-x-[150px] items-center">
						<h2 className="font-header text-blue-800 font-medium text-xl">Genre</h2>
						{selectedGenre && (
							<Button variant="tertiary" onClick={genreClear}>Clear</Button>
						)}
					</div>
					<Dropdown options={genresList} placeholder="Select genre" value={selectedGenre} onChange={genreChange} />
				</div>
			</div>
			
			{/* There is a UI bug, if not wrapped in a div */}
			<div> 
				<Link to="/posts/create">
					<Button variant="primary">Create post</Button>
				</Link>
			</div>
			

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
			<Outlet />
		</div>
	);
}
