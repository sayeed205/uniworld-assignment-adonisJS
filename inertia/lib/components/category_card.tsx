import { Link } from '@inertiajs/react'
import { Skeleton } from './ui/skeleton'

interface CategoryCardProps {
  name: string
  description: string
  id: string
}

const CategoryCard: React.FunctionComponent<CategoryCardProps> = ({ name, description, id }) => {
  return (
    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
      <Link href={`/products?category=${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Category</span>
      </Link>
      <Skeleton className="w-96 h-72" />
      <div className="p-4 bg-background">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
