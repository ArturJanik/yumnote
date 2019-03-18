FactoryBot.define do
  factory :document do
    title { 'Document title' }
    content { 'Document content' }
    short_content { 'Document short content' }
    visible { true }
  end
end