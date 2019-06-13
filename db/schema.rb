# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_13_153947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.boolean "active", default: true
    t.integer "order"
    t.string "color"
    t.bigint "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["parent_id"], name: "index_categories_on_parent_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "title"
    t.text "short_content"
    t.text "content"
    t.string "slug"
    t.boolean "visible", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_documents_on_slug"
  end

  create_table "foodnotes", force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "user_id"
    t.float "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "creation_date"
    t.index ["created_at"], name: "index_foodnotes_on_created_at"
    t.index ["creation_date"], name: "index_foodnotes_on_creation_date"
    t.index ["product_id"], name: "index_foodnotes_on_product_id"
    t.index ["user_id"], name: "index_foodnotes_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.float "kcal"
    t.float "carb"
    t.float "fat"
    t.float "prot"
    t.float "amount"
    t.string "unit", default: "0", null: false
    t.bigint "category_id"
    t.bigint "user_id"
    t.boolean "visible", default: true
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at"
    t.boolean "private", default: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["name"], name: "index_products_on_name"
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time_zone"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true
    t.index ["email"], name: "index_users_on_email"
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "categories", "categories", column: "parent_id"
  add_foreign_key "foodnotes", "products"
  add_foreign_key "foodnotes", "users"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "users"
end
