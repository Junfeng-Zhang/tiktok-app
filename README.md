# TikTok 网页版

### 



## 应用设置 (localhost)

```
git clone https://github.com/Junfeng-Zhang/tiktok-app.git
```

### 在根目录下新建 .env 文件，设置环境变量

```
NEXT_PUBLIC_APPWRITE_URL='https://cloud.appwrite.io/v1'
NEXT_PUBLIC_ENDPOINT=''
NEXT_PUBLIC_DATABASE_ID=''

NEXT_PUBLIC_COLLECTION_ID_PROFILE=''
NEXT_PUBLIC_COLLECTION_ID_POST=''
NEXT_PUBLIC_COLLECTION_ID_LIKE=''
NEXT_PUBLIC_COLLECTION_ID_COMMENT=''

NEXT_PUBLIC_BUCKET_NAME="tiktok-app"
NEXT_PUBLIC_BUCKET_ID=''
NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID=''
```



## AppWrite Schema

### Database Name: tiktok-app

### Profile Collection:
| Key | Type |
| --- | --- |
| `Document ID` | String |
| `image` | String |
| `bio` | String |
| `user_id` | String |
| `name` | String |

Profile Indexes:
| KEY           | TYPE          | ATTRIBUTE     | ASC/DESC      |
| ------------- | ------------- | ------------- | ------------- |
| user_id       | key           | user_id       | asc           |
| name          | fulltext      | name          | asc           |

Profile Settings (Update Permissions):
| Add Role      | PERMISSIONS   |
| ------------- | ------------- |
| All guests    | Read          |
| All users     | Create, Read, Update, Delete |

### Post Collection:
| Key | Type |
| --- | --- |
| `Document ID` | String |
| `user_id` | String |
| `video_url` | String |
| `text` | String |
| `created_at` | String |

Post Indexes:
| KEY           | TYPE          | ATTRIBUTE     | ASC/DESC      |
| ------------- | ------------- | ------------- | ------------- |
| user_id       | key           | user_id       | asc           |

Profile Settings (Update Permissions):
| Add Role      | PERMISSIONS   |
| ------------- | ------------- |
| All guests    | Read          |
| All users     | Create, Read, Update, Delete |

### Like Collection:
| Key | Type |
| --- | --- |
| `Document ID` | String |
| `user_id` | String |
| `post_id` | String |

Like Indexes: 
| KEY           | TYPE          | ATTRIBUTE     | ASC/DESC      |
| ------------- | ------------- | ------------- | ------------- |
| user_id       | key           | user_id       | asc           |
| id            | unique        | id            | asc           |
| post_id       | key           | post_id       | asc           |

Like Settings (Update Permissions):
| Add Role      | PERMISSIONS   |
| ------------- | ------------- |
| All guests    | Read          |
| All users     | Create, Read, Update, Delete |

### Comment Collection:
| Key | Type |
| --- | --- |
| `Document ID` | String |
| `user_id` | String |
| `post_id` | String |
| `text` | String |
| `created_at` | String |

Comment Indexes:
| KEY           | TYPE          | ATTRIBUTE     | ASC/DESC      |
| ------------- | ------------- | ------------- | ------------- |
| post_id       | key           | post_id       | asc           |

Comment Settings (Update Permissions):
| Add Role      | PERMISSIONS   |
| ------------- | ------------- |
| All guests    | Read          |
| All users     | Create, Read, Update, Delete |

### 将应用程序连接到 AppWrite 后。 运行命令。

```
npm i

npm run dev
```

### 项目截图
![Home](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/f73222d5-ebdc-4faf-abc1-1b3bb93b2cc0)
![Register](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/8e820185-5ba1-4056-89ff-ddf49f590e89)
![Profile](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/d24f5a95-51c5-484d-9d44-13f43312951c)
![Video_Upload](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/654c5a6f-cbaa-4918-be64-52523ea112c9)
![Comments](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/469a360f-df7c-4524-ad0f-9d969bfb4887)

