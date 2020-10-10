class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.string :subscription_id, null: false, default: ''
      t.string :subscription_path, null: false, default: ''
      t.string :endpoint, null: false, default: ''
      t.string :key_p256dh, null: false, default: ''
      t.string :key_auth, null: false, default: ''
    end
  end
end
