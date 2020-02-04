# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## users テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null:false|
|name|string|null:false|
|email|string|null:false|
|pass|string|null:false|
|group_id|integer|null:false foreign_key:true|

### Association

- has_many :messages
- has_many :groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null:false|
|name|string|null:false|
user_id|integer|foreign_key:true|

### Association

- has_many :users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null:false|
|body|text|null:false|
|image|string|
|group_id|integer|null:false foreign_key:true|
|user_id|integer|null:false foreign_key:true|

## Association

belongs_to user
belongs_to group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user