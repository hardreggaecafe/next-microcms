import Link from "next/link";
import { client } from "../../libs/client";
import { useRouter } from "next/router";

export default function Create () {
    const router = useRouter()
    async function create(event) {
      event.preventDefault()

      const formData = new FormData(event.currentTarget);

      const title = formData.get("title");
      const content = formData.get("content");

      client.create({
        endpoint: "blogs",
        content: {
          title: title,
          content: content,
        }
      }).then((res) => {
        if (res.status === 401) {
          alert("登録ができませんでした。")
        } else {
          alert("登録されました。")
          router.push(`/`)
        }
      })
    }

  return (
    <>
      <div className='main'>
        <h1 className=''>投稿ページ</h1>

        {/* TOPに戻るボタン */}
        <div className="top">
          <Link href="/" className="">
            <button className="">Topに戻る</button>
          </Link>
        </div>

        <div className="contents">

            <div>
                <form onSubmit={ create }>
                  <div>
                      <h2>タイトル</h2>
                      <input name="title" type="text" />
                      
                  </div>
                  <div>
                  <h2>コンテンツ</h2>
                      <textarea name="content" ></textarea>
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