require 'rails_helper'

describe FoodnotesController do
  describe '#create' do
    let(:foodnote) { create(:foodnote) }

    context 'when foodnote is created' do
      subject { foodnote.creation_date.to_s }

      it { should eq(Date.parse('20190311').to_s) }
    end
  end
end
