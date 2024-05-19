import Link from "next/link";
import { client } from "@/libs/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Update ({ blog }) {
  const router = useRouter()
  const id = blog.id;
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const remove_html = text => {
    return text ? text.replace(/(<([^>]+)>)/gi, '') : null;
  }

  async function update(event) {
    event.preventDefault()

    client.update({
      endpoint: "blogs",
      content: {
        title: title,
        content: content,
      },
      contentId: id
    }).then((res) => {
      if (res.status === 401) {
        alert("編集ができませんでした。")
      } else {
        alert("編集されました。")
        router.push(`/`)
      }
    })
  }

  return (
    <>
      <div className='main'>
        <h1 className=''>編集ページ</h1>

        {/* TOPに戻るボタン */}
        <div className="top">
          <Link href="/" className="">
            <button className="">Topに戻る</button>
          </Link>
        </div>

        <div className="contents">

            <div>
                <form onSubmit={ update }>
                  <div>
                      <h2>タイトル</h2>
                      <input name="title" type="text" defaultValue={blog.title} onChange={(event) => setTitle(event.target.value)} />
                  </div>
                  <div>
                  <h2>コンテンツ</h2>
                      <textarea name="content" defaultValue={remove_html(blog.content)} onChange={(event) => setContent(event.target.value)} ></textarea>
                  </div>
                <button type="submit">
                    <p>登録する</p>
                </button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/blog/${content.id}/update`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      blog: data,
      cache: 'no-store' 
    },
  };
};