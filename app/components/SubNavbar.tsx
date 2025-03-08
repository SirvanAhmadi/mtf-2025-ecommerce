import { useState } from 'react';
import { Link, useLoaderData } from 'react-router'
import type { Category } from '~/types/Category'
import type { SubCategory } from '~/types/SubCategory'

const SubNavbar = () => {

  const {cateData} = useLoaderData<{cateData:Category[]}>();

  return (
    <section>
        <nav className="bg-ash-gray">
            <ul className="menu menu-horizontal">
                {cateData.map(cate => (
                    <li key={cate.id} className="min-w-24 max-w-32 relative subCategorySibling" >
                        <Link className={"w-full justify-center "} to={"/"}>
                            {cate.name}
                        </Link>
                        <SubCategoryMenu subCategory={cate.sub_categories} />
                    </li>
                ))}
            </ul>
        </nav>
    </section>
  )
}

const SubCategoryMenu = ({subCategory}:{subCategory:SubCategory[]}) => {

    return (
        <ul className="hidden menu bg-base-200 rounded-box w-56 absolute top-[100%] z-50">
            {subCategory.map(sc => (
                <li key={sc.id}>
                    <Link to={`products/${sc.slug}`}>
                        {sc.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SubNavbar