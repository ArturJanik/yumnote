require 'rails_helper'

describe Document do
  context "when uses factory" do
    it "has a valid factory" do
      expect(build(:document)).to be_valid
    end
  end

  context "when is validated" do
    let(:document) { create(:document) }
    describe 'validations' do
      it { is_expected.to validate_presence_of(:title) }
      it { is_expected.to validate_presence_of(:content) }
      it { is_expected.to validate_presence_of(:short_content) }

      it { is_expected.to validate_uniqueness_of(:title) }
      it { is_expected.to validate_uniqueness_of(:slug) }
    end
  end
end