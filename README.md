# Music App

Đây là dự án học tập cá nhân — một ứng dụng nghe nhạc trực tuyến, xây dựng bằng Node.js, Express, TypeScript và MongoDB. Dự án gồm hai phần: trang dành cho người nghe (client) và trang quản trị dành cho admin (gọi trong code là "manager").

Mục tiêu khi làm dự án này là thực hành xây dựng một hệ thống có nhiều luồng tương tác thực tế hơn dự án bán hàng trước đó: bình luận lồng nhau (giống YouTube/Facebook), theo dõi ca sĩ và nhận thông báo khi có bài hát mới, xác thực bằng Passport.js với session thay vì tự viết cookie thủ công, và một hệ phân quyền được tách thành các collection riêng thay vì nhúng trực tiếp vào role.

---

## 📋 Table of Contents

- [Dự án này làm được gì](#-dự-án-này-làm-được-gì)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Application Workflows](#-application-workflows)
  - [Authentication Flow (Passport.js + Session)](#1-authentication-flow-passportjs--session)
  - [Nghe nhạc — Lượt xem, Like, Yêu thích](#2-nghe-nhạc--lượt-xem-like-yêu-thích)
  - [Bình luận lồng nhau (Nested Comment)](#3-bình-luận-lồng-nhau-nested-comment)
  - [Theo dõi ca sĩ & Thông báo bài hát mới](#4-theo-dõi-ca-sĩ--thông-báo-bài-hát-mới)
  - [Quên mật khẩu & Đổi mật khẩu qua OTP](#5-quên-mật-khẩu--đổi-mật-khẩu-qua-otp)
  - [Quản lý nội dung (Admin) & Lịch sử chỉnh sửa](#6-quản-lý-nội-dung-admin--lịch-sử-chỉnh-sửa)
  - [Phân quyền (RBAC) — Role tách khỏi Permission](#7-phân-quyền-rbac--role-tách-khỏi-permission)
  - [Chế độ bảo trì (Maintenance Mode)](#8-chế-độ-bảo-trì-maintenance-mode)
  - [Upload file lên Cloudinary](#9-upload-file-lên-cloudinary)
  - [Tối ưu truy vấn bằng Index (MongoDB)](#10-tối-ưu-truy-vấn-bằng-index-mongodb)
- [API & Routes Reference](#-api--routes-reference)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Một số cách xử lý đáng chú ý](#-một-số-cách-xử-lý-đáng-chú-ý)

---

## 🔍 Dự án này làm được gì

Ứng dụng chia thành hai khu vực, dùng chung một Express app nhưng có session và tiền tố route riêng:

**Phần Client** (người nghe nhạc):

| Chức năng | Mô tả |
|---|---|
| Đăng ký / đăng nhập | Xác thực qua Passport.js (chiến lược `local-client`), giới hạn 5 lần thử trong 5 phút |
| Nghe nhạc | Danh sách bài hát theo chủ đề, bài hát nổi bật, bài hát mới, tìm kiếm (có gợi ý theo thời gian thực) |
| Chi tiết bài hát | Xem lời bài hát, nghe qua trình phát nhạc, tự động ghi nhận lượt xem |
| Like / Yêu thích | Thích hoặc bỏ thích bài hát, thêm/xóa khỏi danh sách yêu thích |
| Bình luận | Bình luận và trả lời bình luận (không giới hạn số cấp), like/dislike bình luận |
| Theo dõi ca sĩ | Theo dõi/bỏ theo dõi ca sĩ, nhận thông báo khi ca sĩ đăng bài hát mới |
| Thông báo | Trang thông báo riêng, đánh dấu đã đọc, xóa toàn bộ thông báo |
| Lịch sử nghe | Xem lại danh sách bài hát đã nghe gần đây |
| Hồ sơ cá nhân | Xem/sửa thông tin, đổi avatar, đổi mật khẩu (yêu cầu xác thực OTP qua email dù đã đăng nhập) |
| Quên mật khẩu | Gửi OTP qua email, xác thực rồi đặt lại mật khẩu |

**Phần Admin** (quản trị viên):

| Chức năng | Mô tả |
|---|---|
| Quản lý bài hát | Tạo/sửa/xóa bài hát, upload ảnh bìa + file audio, đánh dấu nổi bật |
| Quản lý ca sĩ | CRUD ca sĩ, ảnh đại diện, mô tả |
| Quản lý chủ đề (topic) | CRUD chủ đề để phân loại bài hát |
| Quản lý người dùng | Xem, khóa/mở tài khoản người nghe |
| Quản lý tài khoản quản trị | Tạo tài khoản admin, gán vai trò (role) |
| Phân quyền (RBAC) | Tạo role, gán danh sách quyền theo từng module (bài hát, ca sĩ, chủ đề, người dùng, ...) |
| Lịch sử chỉnh sửa | Xem log ai đã sửa gì, khi nào, cho từng bài hát/ca sĩ/chủ đề/role |
| Dashboard | Thống kê tổng số người dùng, bài hát, lượt xem, lượt thích, lượt theo dõi, top bài hát/ca sĩ |
| Cài đặt chung | Tên website, logo, thông tin liên hệ, bật/tắt chế độ bảo trì |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Ngôn ngữ** | TypeScript |
| **Web Framework** | Express.js |
| **Template Engine** | Pug |
| **Database** | MongoDB (Mongoose ODM) |
| **Xác thực** | Passport.js (passport-local) + express-session + bcrypt |
| **Cloud Storage** | Cloudinary (ảnh + file audio) |
| **Email** | Nodemailer + Gmail SMTP |
| **Rate Limiting** | express-rate-limit (chống brute-force đăng nhập) |
| **Rich Text Editor** | TinyMCE |
| **Slug** | thư viện `slug` + hàm tự viết bỏ dấu tiếng Việt |
| **Session Store** | express-session (namespace riêng cho admin và client) |
| **Dev Tool** | ts-node, nodemon |

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                          BROWSER                                │
│   Cookie "client.sid"  (người nghe)                              │
│   Cookie "admin.sid"   (quản trị viên, path scope = /server)     │
└───────────────────────────┬────────────────────────────────────┘
                            │ HTTP Request
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                     EXPRESS SERVER (app.ts)                    │
│                                                                │
│  generalSettingMiddleware → kiểm tra maintenance mode toàn cục  │
│                                                                │
│  ┌──────────────────────┐      ┌───────────────────────────┐   │
│  │   Client Routes      │      │   Admin Routes (/server)   │   │
│  │   /home  /song       │      │   /dashboard  /song        │   │
│  │   /singer  /topic    │      │   /singer  /topic          │   │
│  │   /api (comment)     │      │   /user  /manager           │   │
│  │   /profile  /playlist│      │   /role  /permission        │   │
│  │   /notification      │      │   /profile  /setting        │   │
│  │   /feed  /contact    │      │   /verification              │   │
│  │   /auth  /verification│     │   /auth                     │   │
│  └──────────┬────────────┘     └─────────────┬───────────────┘   │
│             │                                │                   │
│  ┌──────────▼────────────────────────────────▼───────────────┐  │
│  │        Passport.js (session-based, 2 strategy)              │  │
│  │  local-client → tìm trong UserModel                         │  │
│  │  local-server → tìm trong ManagerModel                      │  │
│  │  deserializeUser → populate đầy đủ quan hệ theo type         │  │
│  └──────────┬────────────────────────────────┬───────────────┘  │
│             │                                │                   │
│  ┌──────────▼─────────┐          ┌───────────▼────────────────┐ │
│  │ isAuthenticated     │          │ isAuthenticated (admin)     │ │
│  │ (client) — kiểm tra │          │ + checkPermission(perm)     │ │
│  │ req.user status/    │          │   → so req.user.roleId      │ │
│  │ deleted             │          │     .permissions.listPermission│ │
│  └──────────┬─────────┘          └───────────┬────────────────┘ │
│             │                                │                   │
│  ┌──────────▼────────────────────────────────▼───────────────┐  │
│  │              Controller → Service Layer                    │  │
│  │   Mỗi module có Controller (điều hướng HTTP) và Service     │  │
│  │   (business logic + query DB) tách riêng                    │  │
│  └──────────┬───────────────────────────────────────────────┘  │
│             │                                                   │
│  ┌──────────▼───────────────────────────────────────────────┐  │
│  │         Shared Helper / Logic                              │  │
│  │  getChildAndParentComments — dựng cây bình luận (hash map)  │  │
│  │  filterArrayLog — gom lịch sử chỉnh sửa từ BlogUpdated       │  │
│  │  pagination, cntDocument, generateRandom, sendMail, unidecode│  │
│  └──────────┬───────────────────────────────────────────────┘  │
│             │                                                   │
│  ┌──────────▼───────────────────────────────────────────────┐  │
│  │                 Model Layer (Mongoose)                     │  │
│  └──────────┬───────────────────────────────────────────────┘  │
└─────────────┼───────────────────────────────────────────────────┘
              │
  ┌───────────▼────────────┐         ┌──────────────────────┐
  │      MongoDB Atlas      │         │      Cloudinary        │
  │ users, managers, roles, │         │ (ảnh bìa + file audio)  │
  │ permissions, songs,     │         └──────────────────────┘
  │ singers, topics,        │
  │ comments, songsLike,    │
  │ songsFavourite,         │
  │ songsView, subscribers, │
  │ message, blogsUpdated,  │
  │ forgot-password,        │
  │ general-setting         │
  └─────────────────────────┘
```

---

## 🗄️ Database Schema

Điểm khác biệt lớn nhất so với các dự án trước: **quan hệ giữa các collection dùng `ObjectId` + `populate()` thật sự** (thay vì lưu ID dưới dạng String rồi tự query thủ công), và **audit trail được tách thành collection riêng** thay vì nhúng mảng trực tiếp vào từng document.

### `users` — Người nghe

```ts
{
  fullName: String,
  email: String,
  password: String,              // bcrypt hash
  avatar: String,
  phone: String,
  listLikesSong: ObjectId,       // ref → SongLike (1-1, mỗi user có 1 document riêng)
  listFavoritesSong: ObjectId,   // ref → SongFavourite
  listViewsSong: ObjectId,       // ref → SongView
  subscribers: ObjectId,         // ref → Subscribers (danh sách ca sĩ đang theo dõi)
  messageId: ObjectId,           // ref → Massage (hộp thông báo riêng)
  managerUser: [ObjectId],       // ref → Manager
  status: "active" | "inactive",
  deleted: Boolean,
  deletedBy: { managerId, at },
  timestamps: true,
}
```

### `managers` — Tài khoản quản trị

```ts
{
  fullName, email, password,     // bcrypt hash
  avatar, phone, description,
  roleId: ObjectId,              // ref → Role
  createdBy: { managerId, at },
  updatedBlogId: ObjectId,       // ref → BlogUpdated (lịch sử sửa hồ sơ)
  deletedBy: { managerId, at },
  status: "active" | "inactive",
  deleted: Boolean,
  timestamps: true,
}
```

### `roles` & `permissions` — Phân quyền tách 2 collection

```ts
// roles
{
  title, description,
  permissions: ObjectId,   // ref → Permission (1-1, không nhúng trực tiếp mảng string)
  role: String,
  status: "active" | "inactive",
  deleted: Boolean,
  createdBy: { managerId, at },
  updatedBlogId: ObjectId,  // ref → BlogUpdated
  deletedBy: { managerId, at },
}

// permissions — collection riêng, mỗi role có 1 document permission tương ứng
{
  listPermission: [String]   // ["song_view", "song_create", "song_edit", "song_delete", ...]
}
```

### `songs` — Bài hát

```ts
{
  title, description, avatar, lyrics, audio,
  topicId: ObjectId,     // ref → Topic
  singerId: ObjectId,    // ref → Singer
  likes: Number,
  views: Number,
  status: "active" | "inactive",
  featured: Boolean,
  deleted: Boolean,
  deletedAt: Date,
  slug: { type: String, unique: true },
  createdBy: { managerId, at },
  updatedBlogId: ObjectId,   // ref → BlogUpdated
  deletedBy: { managerId, at },
  timestamps: true,
}
// Index: { topicId: 1, createdAt: -1 } và { singerId: 1, createdAt: -1 }
```

### `singers` — Ca sĩ

```ts
{
  fullName, avatar, description,
  slug: { type: String, unique: true },
  registrationNumber: Number,   // số lượt theo dõi
  status: "active" | "inactive",
  featured: Boolean,
  deleted: Boolean,
  createdBy, updatedBlogId, deletedBy,
  timestamps: true,
}
```

### `topics` — Chủ đề bài hát

```ts
{
  title, avatar, description,
  slug: { type: String, unique: true },
  status: "active" | "inactive",
  featured: Boolean,
  deleted: Boolean,
  createdBy, updatedBlogId, deletedBy,
  timestamps: true,
}
```

### `comments` — Bình luận (tự tham chiếu, hỗ trợ trả lời lồng nhau)

```ts
{
  song_id: ObjectId,      // ref → Song
  user_id: ObjectId,      // ref → User
  content: { type: String, maxlength: 1000 },
  parent_id: ObjectId,    // ref → Comment (null nếu là bình luận gốc)
  likes: [ObjectId],      // danh sách user đã like
  dislikes: [ObjectId],
  likesCount: Number,
  dislikesCount: Number,
  timestamps: true,
}
// Index: { song_id, createdAt }, { parent_id, createdAt }, { song_id, likesCount }, ...
```

### `songsLike` / `songsFavourite` — Danh sách bài hát đã thích / yêu thích (1 document / user)

```ts
{ listId: [ObjectId] }   // ref → Song
```

### `songsView` — Lịch sử xem (1 document / user, kèm thời điểm xem)

```ts
{
  listId: [
    { idSong: ObjectId, at: Date }   // mỗi lần xem lại chỉ cập nhật "at", không tạo bản ghi mới
  ]
}
```

### `subscribers` — Danh sách ca sĩ đang theo dõi (1 document / user)

```ts
{ listId: [ObjectId] }   // ref → Singer
```

### `message` — Hộp thông báo (1 document / user)

```ts
{
  listId: [
    {
      singer: ObjectId,   // ref → Singer
      title: String,
      description: String,
      link: String,
      seen: Boolean,
    }
  ]
}
```

### `blogsUpdated` — Lịch sử chỉnh sửa (collection dùng chung cho nhiều entity)

```ts
{
  list_blog: [
    {
      managerId: ObjectId,   // ref → Manager
      title: String,         // mô tả hành động, ví dụ: "chỉnh sửa bài hát"
      updatedAt: Date,
    }
  ],
  timestamps: true,
}
// Được tham chiếu từ Song, Singer, Topic, Role, Manager qua trường updatedBlogId
```

### `forgot-password` — OTP dùng chung cho quên mật khẩu và đổi mật khẩu

```ts
{
  email: String,
  otp: String,
  expireAt: { type: Date, default: Date.now },
  // TTL Index: expireAfterSeconds: 60 → tự xóa sau 60 giây
}
```

### `general-setting` — Cài đặt hệ thống

```ts
{
  siteName, contactEmail, phone, logo, copyright,
  maintenance: Boolean,   // bật = chuyển toàn bộ site sang trang bảo trì
  timestamps: true,
}
```

---

## 📁 Project Structure

```
Music-app/
├── src/
│   ├── app.ts                          # Entry point — cấu hình Express, Passport, session, routes
│   │
│   ├── common/
│   │   ├── config/
│   │   │   ├── database.config.ts      # Kết nối MongoDB
│   │   │   ├── prefixName.config.ts    # PATH_ADMIN = "/server"
│   │   │   ├── passport.config.ts      # 2 chiến lược local: local-client, local-server
│   │   │   ├── connectPassport.config.ts # Gắn session + passport vào app
│   │   │   ├── session.client.ts       # Session "client.sid", scope toàn site
│   │   │   └── session.server.ts       # Session "admin.sid", scope "/server"
│   │   │
│   │   ├── model/                      # 15 Mongoose model (liệt kê ở Database Schema)
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts          # isAuthenticated (client) — inject res.locals.user
│   │   │   ├── authServer.middleware.ts    # isAuthenticated (admin) — inject res.locals.manager
│   │   │   ├── checkPermisson.middleware.ts # checkPermission(perm) factory — kiểm tra RBAC
│   │   │   ├── generalSettingMiddleware.ts # Kiểm tra maintenance mode toàn cục
│   │   │   ├── rateLimitAuth.middleware.ts # Giới hạn 5 lần đăng nhập / 5 phút
│   │   │   └── upload.middleware.ts        # Upload buffer lên Cloudinary qua stream
│   │   │
│   │   ├── validate/                   # Validator cho từng loại dữ liệu
│   │   │   ├── auth.validate.ts, dataSong.validate.ts, dataSinger.validate.ts
│   │   │   ├── dataTopic.validate.ts, dataRole.validate.ts, dataManager.validate.ts
│   │   │   ├── changePassword.validate.ts, checkAccessPathTime.validate.ts
│   │   │   ├── changeMulti.validate.ts, status.validate.ts, id.validate.ts, slug.validate.ts
│   │   │
│   │   └── data/
│   │       ├── modules-permissions.data.ts  # Danh sách module + action cho form phân quyền
│   │       ├── modules-roles.data.ts
│   │       └── objectSentMail.data.ts       # Template nội dung email
│   │
│   ├── shared/
│   │   ├── helper/
│   │   │   ├── cntDocument.helper.ts   # Đếm document (song, comment chưa đọc, ...)
│   │   │   └── dataRole.helper.ts
│   │   ├── logic/
│   │   │   ├── getChildAndParentComments.ts  # Dựng cây bình luận bằng hash map
│   │   │   └── filterArrayLog.ts             # Gom lịch sử chỉnh sửa từ nhiều document
│   │   └── util/
│   │       ├── pagination.util.ts, generateRandom.ts, sendMail.util.ts
│   │       ├── isPass.util.ts, unidecode.util.ts   # Bỏ dấu tiếng Việt để tạo slug
│   │
│   └── module/
│       ├── admin/
│       │   ├── controller/    # auth, dashboard, manager, permission, profile, role,
│       │   │                  # setting, singer, song, topic, user, verification
│       │   ├── service/       # tương ứng từng controller — business logic + query DB
│       │   └── route/         # tương ứng từng controller — gắn checkPermission theo action
│       │
│       └── client/
│           ├── controller/    # apiComment, auth, contact, feed, home, notification,
│           │                  # playlist, profile, singer, song, topic, verification
│           ├── service/       # tương ứng từng controller
│           └── route/
│
├── views/                     # Pug templates — admin/ và client/ tách riêng
│   ├── admin/{layouts,mixins,pages,partials}/
│   ├── client/{layouts,mixins,pages,partials}/
│   ├── error/404.pug
│   └── maintenance/index.pug  # Trang hiển thị khi bật chế độ bảo trì
│
├── public/
│   ├── admin/{css,js}/        # dashboard-charts.js, permission.js, change-multi.js, ...
│   └── client/{css,js}/       # aplayer.js (trình phát nhạc), comments.js, like.js, ...
│
├── package.json
├── tsconfig.json
└── .env
```

---

## 🔄 Application Workflows

### 1. Authentication Flow (Passport.js + Session)

Khác với việc tự viết middleware kiểm tra cookie thủ công, dự án này dùng **Passport.js** với chiến lược `passport-local`, kết hợp session lưu ở server (không phải JWT).

```
[Đăng nhập — Client]
POST /auth/login
  ├─→ rateLimitAuthMiddleware: chặn nếu quá 5 lần thử trong 5 phút
  ├─→ passport.authenticate("local-client", {...}):
  │     ├─→ UserModel.findOne({ email, deleted: false })
  │     ├─→ Kiểm tra status !== "inactive"
  │     ├─→ bcrypt.compare(password, user.password)
  │     └─→ done(null, { id: user._id, type: "client" })
  ├─→ passport.serializeUser: lưu { id, type } vào session
  └─→ successRedirect: "/home" | failureRedirect: "/auth/login" (kèm flash message)

[Mỗi request sau khi đăng nhập]
passport.deserializeUser(data):
  ├─→ Nếu data.type === "client":
  │     UserModel.findById(id)
  │       .populate("listLikesSong").populate("listFavoritesSong")
  │       .populate("listViewsSong").populate("subscribers")
  │       .populate("messageId").select("-password")
  │     → gán vào req.user (đã có sẵn toàn bộ quan hệ, không cần query lại)
  │
  └─→ Nếu data.type === "admin":
        ManagerModel.findById(id)
          .populate("createdBy.managerId", "fullName")
          .populate({ path: "updatedBlogId", populate: {...} })
          .populate({ path: "roleId", populate: { path: "permissions" } })
          → gán vào req.user (đã có sẵn cả role + permissions để check RBAC)

[Middleware isAuthenticated — Client]
  ├─→ Kiểm tra req.user.status !== "inactive"
  ├─→ Kiểm tra req.user.deleted !== true
  └─→ res.locals.user = req.user (để Pug view dùng trực tiếp)

[Middleware isAuthenticated — Admin]
  ├─→ req.isAuthenticated() — API có sẵn của Passport, false nếu chưa login
  ├─→ Kiểm tra status/deleted tương tự
  └─→ res.locals.manager = req.user

Hai session hoàn toàn tách biệt:
  Client:  cookie "client.sid", path "/"       → không đụng route admin
  Admin:   cookie "admin.sid",  path "/server"  → không đụng route client
  (Không dùng cùng 1 session, tránh tình trạng đăng nhập admin lại ảnh hưởng client)
```

---

### 2. Nghe nhạc — Lượt xem, Like, Yêu thích

```
[Xem chi tiết bài hát — tự động ghi nhận lượt xem]
GET /song/detail/:slug
  ├─→ SongModel.findOne({ slug }).populate("singerId").populate("topicId")
  ├─→ Kiểm tra user.listViewsSong.listId đã có bài hát này chưa (theo idSong)
  ├─→ Nếu CHƯA xem:
  │     song.views += 1; song.save()
  │     SongViewModel.findByIdAndUpdate(user.listViewsSong, { $push: { listId: { idSong, at: now } } })
  └─→ Nếu ĐÃ xem rồi:
        Chỉ cập nhật lại thời điểm xem gần nhất (không cộng thêm view, không tạo bản ghi trùng)
        SongViewModel.updateOne({ _id, "listId.idSong": song._id }, { $set: { "listId.$.at": now } })

[Like / bỏ Like bài hát]
PATCH /song/like/:type_like/:id     (type_like: "like" | "dislike")
  ├─→ SongModel.findByIdAndUpdate(id, { $inc: { likes: type === "dislike" ? -1 : 1 } })
  └─→ SongLikeModel.findByIdAndUpdate(user.listLikesSong,
        { [$push hoặc $pull]: { listId: songId } })

[Thêm / xóa khỏi Yêu thích]
PATCH /song/favourite/:type_fav/:id
  └─→ SongFavouriteModel.findByIdAndUpdate(user.listFavoritesSong,
        { [$push hoặc $pull]: { listId: songId } })

[Tìm kiếm — có gợi ý real-time]
GET /song/search/:type?q=...
  ├─→ Chuyển từ khóa có dấu → không dấu (unidecode) để so khớp cả slug
  ├─→ filter.$or = [{ title: regex }, { slug: regex_không_dấu }]
  └─→ type === "result"  → render trang kết quả đầy đủ
      type === "suggest" → trả JSON cho ô gợi ý gõ tới đâu hiện tới đó
```

---

### 3. Bình luận lồng nhau (Nested Comment)

Đây là phần có độ phức tạp cao nhất của dự án. Bình luận lưu phẳng trong MongoDB (mỗi document chỉ biết `parent_id` của mình), nhưng cần hiển thị dạng cây nhiều cấp giống Facebook/YouTube.

```
GET /api/comment/:id (id = song_id)
  ├─→ CommentModel.find({ song_id }).sort({ createdAt: -1 }).populate("user_id", "fullName").lean()
  └─→ new getChildAndParentComments(comments, userId).getComments()

Lớp getChildAndParentComments (thuật toán 1 lần duyệt bằng hash map):

  1. Duyệt qua từng comment theo thứ tự nhận được
  2. Với mỗi comment, tạo "node" gồm: id, author, content, isLiked, isDisliked, replies: []
     → lưu vào hashTable[id] để tra cứu nhanh
  3. Nếu comment có parent_id:
       - Nếu cha ĐÃ có trong hashTable → gắn node vào replies của cha ngay
       - Nếu cha CHƯA xuất hiện (comment con đến trước comment cha do thứ tự sort)
         → đẩy tạm vào hàng đợi "pending[parentId]"
  4. Khi xử lý đến comment cha, kiểm tra pending[id của cha] có gì đang chờ không
     → gắn hết các con đang chờ vào ngay lúc đó
  5. Nếu không có parent_id → đây là comment gốc, đẩy thẳng vào mảng kết quả

  → Kết quả: cây bình luận lồng nhau không giới hạn cấp, xử lý được cả trường hợp
    dữ liệu trả về không theo đúng thứ tự cha trước con sau.

[Like / Dislike bình luận — có xử lý chuyển đổi qua lại]
POST /api/comment/react/:id { type: "like" | "dislike" }
  ├─→ Kiểm tra user đã like/dislike bình luận này chưa
  ├─→ Nếu CHƯA từng react theo hướng này:
  │     $addToSet vào mảng tương ứng (likes hoặc dislikes), $inc count +1
  │     Nếu trước đó đã react theo hướng NGƯỢC LẠI:
  │       đồng thời $pull khỏi mảng ngược lại, $inc count ngược lại -1
  │       (chuyển từ dislike sang like trong 1 lần update, không cần 2 request)
  └─→ Nếu ĐÃ react theo hướng này rồi: $pull ra (bỏ react), $inc count -1
```

---

### 4. Theo dõi ca sĩ & Thông báo bài hát mới

```
[Theo dõi / bỏ theo dõi ca sĩ]
PATCH /singer/subscribe/:type/:singerId
  └─→ SubscribersModel.findByIdAndUpdate(user.subscribers,
        { [$push hoặc $pull]: { listId: singerId } })

[Admin đăng bài hát mới → tự động thông báo cho người theo dõi]
POST /server/song/create (sau khi lưu bài hát thành công)
  └─→ pushNotificationToSubscribers(newSong):
        1. Tìm tất cả document Subscribers có chứa singerId này trong listId
        2. Tìm tất cả User có subscribers thuộc danh sách đó
        3. Với mỗi user tìm được:
             MassagesModel.findByIdAndUpdate(user.messageId, {
               $push: { listId: {
                 singer: singerId,
                 title: song.title,
                 description: "Ca sỹ {tên} đã có bài hát mới. Trải nghiệm ngay!",
                 link: "/notification/{slug}",
                 seen: false
               }}
             })

[Người dùng click vào thông báo]
GET /notification/:slug
  └─→ Đánh dấu đã xem, redirect sang trang chi tiết bài hát tương ứng

[Xóa toàn bộ thông báo]
DELETE /notification
  └─→ MassagesModel.findByIdAndUpdate(user.messageId, { listId: [] })
```

---

### 5. Quên mật khẩu & Đổi mật khẩu qua OTP

Điểm khác với 2 dự án trước: **đổi mật khẩu khi đã đăng nhập vẫn phải xác thực OTP qua email**, không chỉ áp dụng cho trường hợp quên mật khẩu.

```
[Trường hợp A — Quên mật khẩu, chưa đăng nhập]
POST /auth/forgot { email }
  ├─→ Kiểm tra email tồn tại
  ├─→ Lưu email vào session (req.session.text)
  └─→ Redirect sang trang nhập OTP

POST /auth/forgot/otp { otp }
  ├─→ ForgotPassword.findOne({ email, otp })
  └─→ Nếu đúng → cho phép truy cập trang đổi mật khẩu

GET /auth/change-password
  └─→ checkAccessPathTimeValidate: kiểm tra session có email hợp lệ không
        (chặn người dùng gõ thẳng URL để bỏ qua bước xác thực OTP)

POST /auth/change-password { password }
  └─→ Cập nhật mật khẩu mới trực tiếp bằng email đã xác thực

[Trường hợp B — Đổi mật khẩu khi đã đăng nhập]
POST /profile/change-password { password }
  ├─→ profileService.cypherPassword(): bcrypt.hash() mật khẩu mới TRƯỚC,
  │     lưu OTP vào ForgotPassword, gửi email OTP
  ├─→ Lưu mật khẩu đã hash vào session (req.session.text) — CHƯA cập nhật vào DB
  └─→ Redirect sang /verification/otp

POST /verification/otp/change-password { otp }
  ├─→ Lấy mật khẩu đã hash từ session + OTP người dùng nhập
  ├─→ ForgotPassword.findOne({ email, otp })
  └─→ Nếu đúng OTP → UserModel.findByIdAndUpdate(id, { password: hashedPassword_từ_session })
        (mật khẩu chỉ thực sự được ghi vào DB sau khi OTP đúng)
```

---

### 6. Quản lý nội dung (Admin) & Lịch sử chỉnh sửa

```
[Tạo bài hát mới]
POST /server/song/create
  ├─→ checkPermission("song_create")
  ├─→ upload.fields([avatar, audio]) → uploadFields middleware upload cả 2 file lên Cloudinary
  ├─→ Tạo document BlogUpdated mới (rỗng) → lấy _id gán vào song.updatedBlogId
  ├─→ new SongModel({ ...body, updatedBlogId, createdBy: { managerId, at } }).save()
  └─→ pushNotificationToSubscribers()  (xem mục 4)

[Sửa bài hát — ghi lịch sử]
PATCH /server/song/edit/:id
  ├─→ checkPermission("song_edit")
  ├─→ BlogUpdatedModel.findByIdAndUpdate(song.updatedBlogId, {
  │     $push: { list_blog: { managerId, title: "chỉnh sửa bài hát", updatedAt: now } }
  │   })
  └─→ SongModel.updateOne({ _id }, dataSong)

[Xem lịch sử chỉnh sửa toàn bộ bài hát]
GET /server/song/blog
  ├─→ SongModel.find({ deleted: false })
  │     .populate({ path: "updatedBlogId", populate: { path: "list_blog.managerId", select: "fullName" } })
  └─→ filterArrayLog: gom hết list_blog từ mọi bài hát vào một mảng phẳng để hiển thị theo timeline

Cùng pattern này áp dụng cho Singer, Topic, Role, Manager — mỗi entity có updatedBlogId
riêng trỏ tới một document BlogUpdated riêng, không dùng chung một collection log toàn cục.
```

---

### 7. Phân quyền (RBAC) — Role tách khỏi Permission

Khác với 2 dự án trước (mảng permission string nhúng thẳng vào Role), ở đây **Role và Permission là 2 collection riêng**, liên kết qua ObjectId.

```
Cấu trúc dữ liệu:
  Role { title, permissions: ObjectId → Permission }
  Permission { listPermission: ["song_view", "song_create", ...] }

[Cập nhật ma trận phân quyền]
GET /server/permission
  └─→ Render trang permission.pug với:
        moduleList: danh sách module + action cố định (từ modules-permissions.data.ts)
        roles: tất cả role kèm permissions đã populate

PATCH /server/permission
  ├─→ Nhận JSON: [{ roleId, permissions: [...] }]
  └─→ Với mỗi role: PermissionModel.updateOne({ _id: role.permissions }, { listPermission: [...] })

[Kiểm tra quyền — middleware factory]
export const checkPermission = (permission: string) => {
  return (req, res, next) => {
    const userPermissions = req.user["roleId"].permissions.listPermission;
    if (!userPermissions.includes(permission)) {
      req.flash("error", "Bạn không có quyền truy cập!");
      return res.redirect(req.get("Referrer") || "/");
    }
    next();
  };
};

// Sử dụng trực tiếp ở route, khác với 2 dự án trước (kiểm tra trong controller):
router.get("/", checkPermission("song_view"), controller.index);
router.post("/create", checkPermission("song_create"), controller.createPost);
```

---

### 8. Chế độ bảo trì (Maintenance Mode)

```
generalSettingMiddleware — gắn ở đầu route client, chạy trước MỌI request:

  const setting = await SettingModel.findOne();
  if (setting.maintenance) {
    return res.redirect("/maintenance");
  }
  res.locals.setting = setting;   // để mọi view dùng chung thông tin site (tên, logo, ...)
  next();

Khi admin bật "maintenance: true" trong trang Cài đặt chung, toàn bộ người dùng
client (chưa vào trang nào) sẽ được chuyển hướng sang trang bảo trì ngay lập tức,
không cần restart server hay deploy lại.
```

---

### 9. Upload file lên Cloudinary

```
Khác với 2 dự án trước (chỉ upload ảnh), ở đây còn upload cả file audio,
dùng resource_type: "auto" để Cloudinary tự nhận diện loại file.

uploadFields middleware — xử lý nhiều field cùng lúc (route dùng upload.fields([...])):

  for (const key in req.files) {           // key: "avatar", "audio"
    req.body[key] = [];
    for (const file of req.files[key]) {
      const url = await uploadCloud(file.buffer);   // upload_stream + streamifier
      req.body[key].push(url);
    }
  }
  next();

Controller/Service sau đó lấy: body.avatar[0], body.audio[0]
```

---

### 10. Tối ưu truy vấn bằng Index (MongoDB)

Đây là phần được đầu tư thêm sau khi đã hoàn thiện chức năng — đọc lại các truy vấn hay dùng nhất trong dự án rồi thêm index tương ứng thay vì để MongoDB quét toàn bộ collection (`COLLSCAN`) mỗi lần query.

```
[Nguyên tắc áp dụng: Index theo đúng cách truy vấn thực tế đang chạy]

Trước khi thêm index, xác định 2 điều cho mỗi query hay lặp lại:
  1. Trường nào dùng để LỌC (equality — ví dụ song_id, topicId, singerId)
  2. Trường nào dùng để SẮP XẾP (sort — ví dụ createdAt, likesCount)
→ Đưa cả 2 vào cùng 1 compound index, trường lọc đứng trước, trường sort đứng sau.
  (Đây là thứ tự "Equality → Sort" quen dùng khi thiết kế compound index cho MongoDB.)
```

**Danh sách index đã thêm và lý do:**

| Collection | Index | Loại | Query được tối ưu |
|---|---|---|---|
| `comments` | `{ song_id: 1, createdAt: -1 }` | Compound | `CommentModel.find({ song_id }).sort({ createdAt: -1 })` — lấy toàn bộ bình luận của 1 bài hát, mới nhất trước. Đây là query chạy mỗi lần mở trang chi tiết bài hát, tần suất cao nhất trong toàn bộ dự án |
| `comments` | `{ user_id: 1, createdAt: -1 }` | Compound | Dự phòng cho truy vấn lịch sử bình luận của 1 user (tra cứu/kiểm duyệt), chưa có màn hình nào gọi tới ở thời điểm hiện tại |
| `comments` | `{ parent_id: 1, createdAt: -1 }` | Compound | Dự phòng cho việc truy vấn riêng các bình luận trả lời theo `parent_id`. Hiện tại cây bình luận được dựng trong bộ nhớ từ toàn bộ kết quả `find({ song_id })` (mục 3), nên index này chưa thực sự được tận dụng — thêm sẵn để dễ chuyển sang phân trang theo nhánh reply sau này mà không cần đổi schema |
| `comments` | `{ song_id: 1, likesCount: -1 }` | Compound | Dự phòng cho tính năng "bình luận nổi bật nhất" (sort theo lượt like) trong 1 bài hát — chưa có API/route nào implement tính năng này |
| `comments` | `{ song_id: 1, dislikesCount: -1 }` | Compound | Tương tự, dự phòng cho việc lọc/kiểm duyệt bình luận bị dislike nhiều |
| `songs` | `{ topicId: 1, createdAt: -1 }` | Compound | `SongModel.find({ topicId }).populate(...)` — lấy bài hát theo chủ đề, dùng ở trang danh sách theo topic |
| `songs` | `{ singerId: 1, createdAt: -1 }` | Compound | `SongModel.find({ singerId }).sort({ createdAt: -1 })` — lấy bài hát theo ca sĩ ở trang chi tiết ca sĩ, khớp cả điều kiện lọc lẫn điều kiện sort mặc định ("mới nhất") |
| `songs` | `{ slug: 1 }` | Unique | Tự tạo khi khai báo `unique: true` trên field `slug`. Dùng cho `findOne({ slug })` ở trang chi tiết bài hát — đồng thời đảm bảo không trùng slug giữa các bài hát |
| `singers` | `{ slug: 1 }` | Unique | Tương tự — `findOne({ slug })` ở trang chi tiết ca sĩ, đảm bảo slug không trùng |
| `topics` | `{ slug: 1 }` | Unique | Tương tự — `findOne({ slug })` ở trang danh sách bài hát theo chủ đề |
| `forgot-password` | `{ expireAt: 1 }` | TTL (`expireAfterSeconds: 60`) | Không phải index tăng tốc truy vấn mà dùng để MongoDB tự xóa document sau 60 giây — cách tối ưu khác: giảm số lượng document cần quét trong collection theo thời gian, thay vì phải tự viết cron dọn dữ liệu (xem thêm ở mục 5) |

**Ví dụ cụ thể — vì sao thứ tự trường trong compound index quan trọng:**

```ts
// Khai báo trong comment.model.ts
CommentSchema.index({ song_id: 1, createdAt: -1 });

// Query thực tế chạy mỗi lần mở 1 bài hát:
CommentModel.find({ song_id: id }).sort({ createdAt: -1 });

// Nếu khai báo ngược lại { createdAt: -1, song_id: 1 }, MongoDB vẫn dùng được
// index này để lọc song_id, nhưng không tận dụng được để sort — vì phần đầu
// index (createdAt) không khớp với điều kiện lọc equality (song_id).
// Đặt song_id trước (trường lọc) rồi mới tới createdAt (trường sort) giúp
// MongoDB dùng index để trả kết quả ĐÃ SẴN SÀNG THEO ĐÚNG THỨ TỰ, không cần
// bước sort riêng (in-memory sort) sau khi lấy dữ liệu ra.
```

**Nhìn lại — index nào đang thực sự phát huy tác dụng, index nào là chuẩn bị trước:**

Trong số các index đã thêm, 4 index sau đang được một query thực tế trong code sử dụng đúng cả điều kiện lọc lẫn điều kiện sort: `comments{song_id, createdAt}`, `songs{topicId, createdAt}`, `songs{singerId, createdAt}`, và 3 index unique trên `slug`. Các index còn lại (`parent_id`, `likesCount`, `dislikesCount`, `user_id`) được thêm trước cho những tính năng đã hình dung trong lúc thiết kế database nhưng chưa kịp làm giao diện/API tương ứng — để lại đây làm rõ để không nhầm là toàn bộ index đều đang "chạy có tác dụng".

---

## 🗺️ API & Routes Reference

### Client Routes (prefix `/`)

| Method | Path | Mô tả | Auth |
|---|---|---|---|
| GET | `/auth/register`, `/auth/login` | Trang đăng ký / đăng nhập | — |
| POST | `/auth/login` | Xử lý đăng nhập (Passport + rate limit) | — |
| GET | `/auth/logout` | Đăng xuất | — |
| GET/POST | `/auth/forgot`, `/auth/forgot/otp` | Quên mật khẩu qua OTP | — |
| GET/POST | `/auth/change-password` | Đặt lại mật khẩu (yêu cầu đã qua OTP) | — |
| GET | `/home` | Trang chủ | Required |
| GET | `/song/topic/:slug` | Bài hát theo chủ đề | Required |
| GET | `/song/hot`, `/song/new` | Bài hát nổi bật / mới | Required |
| GET | `/song/detail/:slug` | Chi tiết bài hát (auto ghi view) | Required |
| PATCH | `/song/like/:type_like/:id` | Like/Dislike bài hát | Required |
| PATCH | `/song/favourite/:type_fav/:id` | Thêm/xóa Yêu thích | Required |
| GET | `/song/search/:type` | Tìm kiếm (result/suggest) | Required |
| GET | `/api/comment/:id` | Danh sách bình luận (dạng cây) | Required |
| POST | `/api/comment/:id` | Đăng bình luận / trả lời | Required |
| POST | `/api/comment/react/:id` | Like/Dislike bình luận | Required |
| GET | `/singer` | Danh sách ca sĩ | Required |
| GET | `/singer/detail/:id` | Chi tiết ca sĩ | Required |
| PATCH | `/singer/subscribe/:type/:singerId` | Theo dõi/bỏ theo dõi | Required |
| GET | `/profile` | Hồ sơ cá nhân | Required |
| PATCH | `/profile/edit` | Sửa hồ sơ + avatar | Required |
| POST | `/profile/change-password` | Đổi mật khẩu (bắt đầu luồng OTP) | Required |
| GET/POST | `/verification/otp` | Xác thực OTP đổi mật khẩu | Required |
| GET | `/playlist` | Danh sách bài hát đã like | Required |
| GET | `/playlist/favourite` | Danh sách bài hát yêu thích | Required |
| GET | `/notification/:slug` | Mở thông báo → redirect bài hát | Required |
| DELETE | `/notification` | Xóa toàn bộ thông báo | Required |
| GET | `/feed` | Danh sách ca sĩ đang theo dõi | Required |
| GET | `/feed/history` | Lịch sử bài hát đã nghe | Required |
| GET/POST | `/contact` | Trang liên hệ | Required |

### Admin Routes (prefix `/server`)

| Method | Path | Mô tả | Permission |
|---|---|---|---|
| GET/POST | `/server/auth/login` | Đăng nhập admin | — |
| GET | `/server/dashboard` | Thống kê tổng quan | Auth |
| GET | `/server/song` | Danh sách bài hát | `song_view` |
| GET | `/server/song/blog` | Lịch sử chỉnh sửa bài hát | `song_view` |
| POST | `/server/song/create` | Tạo bài hát (kèm gửi thông báo) | `song_create` |
| PATCH | `/server/song/edit/:id` | Sửa bài hát | `song_edit` |
| PATCH | `/server/song/change-status/:id` | Đổi trạng thái | `song_edit` |
| PATCH | `/server/song/change-multi` | Bulk action | `song_edit` |
| DELETE | `/server/song/delete/:id` | Xóa mềm | `song_delete` |
| GET/POST/PATCH/DELETE | `/server/singer/...` | CRUD ca sĩ | `singer_*` |
| GET/POST/PATCH/DELETE | `/server/topic/...` | CRUD chủ đề | `topic_*` |
| GET/PATCH | `/server/user/...` | Quản lý người dùng | `user_*` |
| GET/POST/PATCH/DELETE | `/server/manager/...` | CRUD tài khoản admin | `manager_*` |
| GET/POST/PATCH/DELETE | `/server/role/...` | CRUD nhóm quyền | `role_*` |
| GET/PATCH | `/server/permission` | Ma trận phân quyền | Auth |
| GET/PATCH | `/server/profile` | Hồ sơ admin đang đăng nhập | Auth |
| GET/POST | `/server/verification/...` | Xác thực OTP đổi mật khẩu (admin) | Auth |
| GET/PATCH | `/server/setting/general` | Cài đặt chung + bật/tắt bảo trì | Auth |

---

## 🔐 Environment Variables

```env
# Server
PORT=3000

# MongoDB Atlas
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Session — 2 secret riêng cho admin và client
SESSION_SECRET_SERVER=your_admin_session_secret
SESSION_SECRET_CLIENT=your_client_session_secret

# Email — Gmail App Password
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret

# TinyMCE (rich text editor cho mô tả/nội dung)
API_KEY_TINYMCE=your_tinymce_api_key
```

> ⚠️ File `.env` đã có trong `.gitignore`. Không commit lên repository.

---

## 🚀 Getting Started

### Yêu cầu

- Node.js >= 18.x
- MongoDB Atlas account
- Cloudinary account (hỗ trợ cả upload audio)
- Gmail account với App Password
- Tài khoản TinyMCE (miễn phí) để lấy API key

### Cài đặt

```bash
yarn install

# Tạo file .env theo mẫu ở trên

yarn dev
# Server chạy tại http://localhost:3000
```

### Truy cập ứng dụng

| URL | Mô tả |
|---|---|
| `http://localhost:3000` | Trang chủ client |
| `http://localhost:3000/server/auth/login` | Đăng nhập admin |

### Tạo tài khoản Admin + Role đầu tiên

Chưa có flow tạo admin qua giao diện, cần insert thủ công:

```js
// 1. Tạo document Permission trước
// collection "permissions"
{
  listPermission: [
    "song_view", "song_create", "song_edit", "song_delete",
    "singer_view", "singer_create", "singer_edit", "singer_delete",
    "topic_view", "topic_create", "topic_edit", "topic_delete",
    "role_view", "role_create", "role_edit", "role_delete",
    "user_view", "user_create", "user_edit", "user_delete",
    "manager_view", "manager_create", "manager_edit", "manager_delete"
  ]
}

// 2. Tạo Role, gán permissions = _id vừa tạo ở bước 1
// collection "roles"
{
  title: "Super Admin",
  permissions: "<_id của permission ở bước 1>",
  status: "active",
  deleted: false
}

// 3. Tạo Manager, gán roleId = _id vừa tạo ở bước 2
// collection "managers"
{
  fullName: "Admin",
  email: "admin@example.com",
  password: "<bcrypt_hash>",
  roleId: "<_id của role ở bước 2>",
  status: "active",
  deleted: false
}

// 4. Tạo document Setting mặc định (generalSettingMiddleware cần document này tồn tại)
// collection "general-setting"
{
  siteName: "Music App",
  maintenance: false
}
```

---

## 🧩 Một số cách xử lý đáng chú ý

### Dựng cây bình luận bằng hash map trong 1 lần duyệt
Thay vì dùng đệ quy gọi lại database nhiều lần (như subtask ở dự án quản lý công việc), bình luận được lấy hết ra một lần rồi dựng cây hoàn toàn trong bộ nhớ bằng một class riêng (`getChildAndParentComments`). Cách này chỉ cần một lần duyệt mảng, xử lý được cả trường hợp comment con xuất hiện trước comment cha trong mảng kết quả (nhờ hàng đợi `pending`), và không tốn thêm query nào tới MongoDB dù cây có sâu bao nhiêu cấp.

### Toggle like/dislike bằng một update xử lý cả hai chiều
Khi người dùng đổi từ dislike sang like, thay vì gọi 2 request riêng (gỡ dislike rồi thêm like), service tính sẵn cả hai thao tác `$addToSet`/`$pull` và `$inc` cho cả hai chiều, gộp vào một lệnh `updateOne` duy nhất. Giảm số lần ghi vào database và tránh trạng thái trung gian không nhất quán nếu request bị gián đoạn giữa chừng.

### Audit trail dùng collection riêng thay vì mảng nhúng
Ở 2 dự án trước, lịch sử chỉnh sửa (`updatedBy`) là một mảng nhúng thẳng trong document. Ở dự án này, mỗi entity (bài hát, ca sĩ, chủ đề, role, manager) trỏ tới một document `BlogUpdated` riêng qua `updatedBlogId`. Cách này tách lịch sử ra khỏi document chính — document chính gọn hơn khi query danh sách (không kéo theo cả lịch sử), và việc populate lịch sử chỉ xảy ra ở trang cần xem (`/song/blog`), không ảnh hưởng tới các trang danh sách thông thường.

### Đổi mật khẩu khi đã đăng nhập vẫn qua OTP email
Mật khẩu mới được hash trước và tạm lưu trong session, chỉ thực sự ghi vào database sau khi người dùng xác thực đúng OTP gửi qua email. Việc này đảm bảo dù có ai chiếm được phiên đăng nhập (session) của người dùng, họ cũng không thể đổi mật khẩu ngay lập tức nếu không truy cập được hộp email.

### Hai session độc lập cho admin và client
`express-session` được cấu hình 2 lần với tên cookie và `secret` khác nhau — session admin còn giới hạn `path: "/server"` nên trình duyệt chỉ gửi cookie đó khi gọi tới route admin. Nhờ vậy một người vừa đăng nhập client vừa đăng nhập admin trên cùng trình duyệt sẽ không bị đè phiên lẫn nhau.

### RBAC kiểm tra bằng middleware factory ở route
Khác với dự án quản lý công việc (kiểm tra permission trong từng hàm controller), ở đây `checkPermission(permission)` là một factory function trả về middleware, gắn thẳng vào route: `router.post("/create", checkPermission("song_create"), controller.createPost)`. Cách này giúp nhìn vào file route là biết ngay hành động nào cần quyền gì, không cần mở controller ra đọc.

### Thêm Index dựa trên query thực tế, không thêm tràn lan
Đây là điểm mới học được khi làm dự án này (chi tiết ở mục 10 phần Workflows). Thay vì đoán trường nào "có vẻ" cần index, cách làm ở đây là xem lại những câu query chạy thường xuyên nhất trong code (danh sách bình luận của 1 bài hát, danh sách bài hát theo chủ đề/ca sĩ), xác định trường nào dùng để lọc và trường nào dùng để sắp xếp, rồi mới thêm compound index theo đúng thứ tự lọc trước – sắp xếp sau. Một số index (theo `parent_id`, theo `likesCount`/`dislikesCount`) được thêm trước cho các tính năng dự tính làm sau này nhưng chưa có query nào dùng tới — được ghi chú rõ trong tài liệu để không nhầm lẫn giữa index "đang tối ưu thật" và index "chuẩn bị sẵn".

---

## 👤 Author

Dự án cá nhân, xây dựng trong quá trình học và thực hành full-stack TypeScript với các luồng tương tác phức tạp hơn (bình luận lồng nhau, thông báo, theo dõi) so với các dự án trước đó.
