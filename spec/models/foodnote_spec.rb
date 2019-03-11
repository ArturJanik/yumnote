require 'rails_helper'

describe Foodnote do
  subject { create(:foodnote) }

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:product) }
  end

  describe 'validations' do
    it { should validate_presence_of(:amount) }
    it { should validate_presence_of(:created_at) }
  end
end

