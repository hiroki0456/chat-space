## users テーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false|
|pass|string|null:false|
|group_id|integer|null:false foreign_key:true|

### Association

- has_many :messages
- has_many :groups, through:groups-users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|user_id|integer|foreign_key:true|

### Association

- has_many :users, through:groups-users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string|
|group_id|integer|null:false foreign_key:true|
|user_id|integer|null:false foreign_key:true|

## Association

- belongs_to user
- belongs_to group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user