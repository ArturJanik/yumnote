FactoryBot.define do
  factory :document do
    title { 'Document title' }
    content { 'Document content' }
    short_content { 'Document short content' }
    visible { true }
  end

  factory :admin_document, class: Document do
    title { 'Document title 2' }
    content { 'Document content 2' }
    short_content { 'Document short content 2' }
    visible { true }
  end
end