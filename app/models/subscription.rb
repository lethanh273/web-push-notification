class Subscription < ApplicationRecord
  validates :subscription_id, :subscription_path, :endpoint, :key_p256dh, :key_auth, presence: true
end
