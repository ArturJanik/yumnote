require 'rails_helper'

describe Product do
  context "when uses factory" do
    let(:user) { create(:user) }
    let(:category) { create(:category) }
    it "has a valid factory" do
      expect(build(:product, user: user, category: category)).to be_valid
    end
  end

  context "when is validated" do
    let(:product) { create(:product) }

    describe 'associations' do
      subject { product }
      it { is_expected.to have_many(:foodnotes) }
      it { is_expected.to belong_to(:category) }
      it { is_expected.to belong_to(:user).optional }
    end

    describe 'validations' do
      subject { product }
      it { is_expected.to validate_presence_of(:name) }
      it { is_expected.to validate_presence_of(:kcal) }
      it { is_expected.to validate_presence_of(:category_id) }

      it { is_expected.to validate_uniqueness_of(:name) }
      it { is_expected.to validate_length_of(:name).is_at_least(2) }
      it { is_expected.to validate_numericality_of(:kcal).is_greater_than_or_equal_to(0) }
      it { is_expected.to validate_numericality_of(:carb).is_greater_than_or_equal_to(0) }
      it { is_expected.to validate_numericality_of(:fat).is_greater_than_or_equal_to(0) }
      it { is_expected.to validate_numericality_of(:prot).is_greater_than_or_equal_to(0) }
      it { is_expected.to validate_numericality_of(:amount).is_greater_than_or_equal_to(1) }
    end
  end

  context "when is created" do
    context "when product name is not unique to creator" do
      let(:user) { create(:user) }
      let(:product) { create(:product, name: 'Product', user: user) }
      let(:second_product) { create(:second_product, name: 'Product', user: user) }
      subject { second_product }

      it { is_expected.to_not validate_uniqueness_of(:name).case_insensitive }
    end
  end
end