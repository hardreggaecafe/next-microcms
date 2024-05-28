import React from 'react'
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { client } from '@/libs/client'
import { useRouter } from "next/router";

function List( {blog} ) {
    const router = useRouter();

    async function deleteItem(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const id = formData.get('id');
        client.delete({
          endpoint: 'blogs',
          contentId: id,
        })
          .then((res) => {
            alert("正常に削除されました。")
            router.push(`/`)
          })
          .catch((err) => {
            alert("削除できませんでした。"+err)
          })
    }

    return (
        <div id="blog-list">
        {blog.map((blog) => (
            <div className={styles.div}>
            <ul className={styles.ul}>
                <li className={styles.li} key={blog.id}>
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                <Link href={`/blog/${blog.id}/update`} className="">
                    <button className="">編集</button>
                </Link>
                <form onSubmit={ deleteItem }>
                    <input type="hidden" name="id" value={blog.id} />
                    <input type="submit" value="削除" />
                </form>
                </li>
            </ul>
            </div>
        ))}
        </div>
    )
}

export default List;