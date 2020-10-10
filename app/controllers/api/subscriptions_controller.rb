module Api
  class SubscriptionsController < BaseController
    def create
      subscription = Subscription.new(permitted_attributes)
      subscription.save!

      head :ok
    end

    def destroy
      subscription = Subscription.find_by(subscription_id: params[:id])
      subscription.destroy!

      head :ok
    end

    private

    def permitted_attributes
      params.permit(:subscription_id, :subscription_path, :key_auth, :key_p256dh, :endpoint)
    end
  end
end
