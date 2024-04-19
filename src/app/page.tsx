import Header from "@/components/organisms/Header/Header";

export default function Home() {
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