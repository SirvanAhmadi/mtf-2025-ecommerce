import { Link } from 'react-router';
import type { SubCategory } from '~/types/SubCategory';

interface SubCategoryMenuProps {
    subCategory: SubCategory[];
}

const SubCategoryMenu = ({ subCategory }: SubCategoryMenuProps) => {
    return (
        <ul className="hidden menu bg-base-200 rounded-box w-56 absolute top-[100%] z-50">
            {subCategory.map((sc) => (
                <li key={sc.id}>
                    <Link to={`/products/${sc.slug}`}>{sc.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default SubCategoryMenu;