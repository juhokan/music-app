import { Skeleton } from 'primereact/skeleton'

const AlbumSkeleton = () => {
  return (
    <div className='album-page-container'>
      <div className='album-page-cover-container'>
        <Skeleton className='album-page-cover-skeleton' shape='rectangle' />
      </div>
      <Skeleton height='150px' width='100%' className='m-4' shape='rectangle' />
      <Skeleton height='50px' width='100%' className='mb-4' shape='rectangle' />
      <Skeleton height='50px' width='100%' className='mb-4' shape='rectangle' />
      <Skeleton height='50px' width='100%' className='mb-4' shape='rectangle' />
    </div>
  )
}

export default AlbumSkeleton