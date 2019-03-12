require 'rails_helper'

describe Foodnote do
  context "when uses factory" do
    let(:product) { create(:product) }
    let(:user) { create(:user) }
    it "has a valid factory" do
      expect(build(:foodnote, user: user, product: product)).to be_valid
    end
  end

  context "when foodnote is validated" do
    let(:foodnote) { create(:foodnote) }

    describe 'associations' do
      subject { foodnote }

      it { should belong_to(:user) }
      it { should belong_to(:product) }
    end

    describe 'validations' do
      subject { foodnote }

      it { should validate_presence_of(:amount) }
      it { should validate_numericality_of(:amount) }
      it { should validate_presence_of(:creation_date) }
      it { should validate_presence_of(:user_id) }
      it { should validate_presence_of(:product_id) }
    end

    describe '.amount' do
      subject { foodnote.amount.to_s }

      it { should eq('10.2') }
    end
  end
end