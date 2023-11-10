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
![Home](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/ee8dae70-7326-473f-8e08-08e6fa60d705)
![Register](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/bcde6913-9611-4120-9567-722b50f7cd90)
![Profile](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/ffd1ee44-e986-4285-9fc5-3a01e6cfc986)
![Video_Upload](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/c3899dad-0918-4d08-9d56-499fb282f516)
![Comments](https://github.com/Junfeng-Zhang/tiktok-app/assets/60849891/a8377285-987c-45fb-8573-5c3508c0b394)

