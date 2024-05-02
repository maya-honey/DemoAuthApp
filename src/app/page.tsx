import request from "@/lib/request";
import { endpoint } from "@/lib/url";
import { User } from "@prisma/client";

export default async function Home() {
  const users = await request.get(endpoint.appApi + 'user/all')
  
  return (
    <>
    <ul>
      {
        PathList.map((path, index) => {
          return (
            <li key={path.path}>
              <a className="text-blue-600" href={path.path}>{path.path}</a>：{path.text}
            </li>
          )
        })
      }
    </ul>
    <div>ユーザーデータ取得↓</div>
    <ul>
      {
        users.data?.map((user: User) => {
          return (
            <li key={user.id}>
              {user.id}：{user.name}: {user.email}
            </li>
          )
        })
      }
    </ul>
    </>
  );
}

const PathList = [
  {
    path: "/",
    text: "",
  },
  {
    path: "/mypage",
    text: 'ログインユーザーのみ'
  },
  {
    path: "/signin",
    text: ''
  },
  {
    path: "/signup",
    text: ''
  },
  {
    path: "/password/reset",
    text: ''
  },
  {
    path: "/admin",
    text: '管理者ユーザーのみ'
  },
  {
    path: "/admin/signin",
    text: ''
  },
  {
    path: "/admin/signup",
    text: ''
  },
  {
    path: "/admin/level1",
    text: '管理者ユーザーのみ'
  },
  {
    path: "/admin/level2",
    text: '管理者ユーザーのみ（Level2）'
  },
  {
    path: "/admin/level3",
    text: '管理者ユーザーのみ（Level3）'
  }
]