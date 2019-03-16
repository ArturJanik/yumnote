require 'rails_helper'

describe Category do
  context "when uses factory" do
    it "has a valid factory" do
      expect(build(:category)).to be_valid
    end
  end

  context "when is validated" do
    let(:category) { create(:category) }

    describe 'associations' do
      subject { category }

      it { is_expected.to have_many(:products) }
      it { is_expected.to have_many(:subcategories).class_name('Category') }
      it { is_expected.to belong_to(:parent).class_name('Category').optional }
    end

    describe 'validations' do
      subject { category }

      it { is_expected.to validate_presence_of(:name) }
      it { is_expected.to validate_length_of(:name).is_at_least(3) }
      it { is_expected.to validate_length_of(:name).is_at_most(50) }

      it { is_expected.to validate_uniqueness_of(:slug) }
    end
  end

  context "when is created" do
    describe '.slug' do
      context "when category name is unique" do
        let(:category) { create(:category) }
        subject(:unique_slug) { category.slug }
        it { is_expected.to eq('dairy-cheese-eggs') }
      end

      context "when category name is not unique" do
        context "and category has no parent" do
          let!(:category) { create(:category) }
          let(:secondcategory) { create(:secondcategory) }
          subject(:slug) { secondcategory.slug }
          it { 
            is_expected.to_not eq('dairy-cheese-eggs')
            is_expected.to eq('dairy-cheese-eggs-1') 
          }
        end
        context "and category has parent" do
          let!(:secondcategory) { create(:secondcategory) }
          let!(:category) { create(:category) }
          subject(:slug) { category.slug }
          it { 
            is_expected.to_not eq('dairy-cheese-eggs')
            is_expected.to_not eq('dairy-cheese-eggs-1') 
            is_expected.to eq('parent-category_dairy-cheese-eggs') 
          }
        end
      end
    end
  end
end