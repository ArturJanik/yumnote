require 'rails_helper'

describe User do
  context "when uses factory" do
    it "has a valid factory" do
      expect(build(:user)).to be_valid
      expect(build(:user, :for_invalid)).not_to be_valid
    end
  end

  context "when existing user is validated" do
    let(:user) { create(:user) }

    describe 'associations' do
      subject { user }
  
      it { is_expected.to have_many(:products) }
      it { is_expected.to have_many(:foodnotes) }
    end

    describe 'fields' do
      subject { user }
    
      it { is_expected.to validate_uniqueness_of(:username) }
      it { is_expected.to validate_length_of(:username).is_at_least(4).is_at_most(50) }
      it { is_expected.to allow_value("abcdef@email.com").for(:email).on(:create) }
      it { is_expected.to_not allow_value("abcdef@email").for(:email).on(:create) }
      it { is_expected.to have_secure_token(:auth_token) }
      it { is_expected.to have_secure_password }
    end
  end

  context "when new user is created" do
    let(:user) { build(:user) }

    describe 'fields' do
      it { is_expected.to validate_presence_of(:email).on(:create) }
      it { is_expected.to validate_presence_of(:username).on(:create) }
      it { is_expected.to validate_presence_of(:password).on(:create) }
      it { is_expected.to validate_presence_of(:time_zone).on(:create) }
      it { is_expected.to validate_length_of(:password).is_at_least(6).on(:create) }
      it { is_expected.to validate_uniqueness_of(:email).case_insensitive.on(:create) }
      it { is_expected.to validate_inclusion_of(:time_zone).in_array(TZInfo::Timezone.all.map(&:name)).on(:create) }
    end
  end
end