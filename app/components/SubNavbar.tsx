import { Link, useLoaderData } from 'react-router';
import type { Category } from '~/types/Category';
import SubCategoryMenu from './SubCategoryMenu'; // اضافه کردم

interface SubNavbarProps {
    cateData: Category[];
}

const SubNavbar = () => {
    const { cateData } = useLoaderData<SubNavbarProps>();

    return (
        <section>
            <nav className="bg-ash-gray">
                <ul className="menu menu-horizontal">
                    {cateData.map((cate) => (
                        <li key={cate.id} className="min-w-24 max-w-32 relative subCategorySibling">
                            <Link className="w-full justify-center" to="/">
                                {cate.name}
                            </Link>
                            <SubCategoryMenu subCategory={cate.sub_categories} />
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
};

export default SubNavbar;