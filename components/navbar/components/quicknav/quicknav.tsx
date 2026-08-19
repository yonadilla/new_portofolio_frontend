import Link from 'next/link'
import "./quicknav.css"


export default function QuickNav() {
  return (
    <ul className='quicknav_header'>
        <li className='quicknav_header_item'>
            <Link className='quicknav_header_link || header_link' href={"/work"}><span>project</span></Link>
        </li>
        <li className='quicknav_header_item'>
            <Link className='quicknav_header_link || header_link' href={"/work"}><span>aboutme</span></Link>
        </li>
    </ul>
  )
}
