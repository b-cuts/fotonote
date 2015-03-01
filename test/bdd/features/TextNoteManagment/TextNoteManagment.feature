Feature: Text Note Managment

Scenario: Creating new text note without a title

   Given I am on the Home page
   When I add new note
   And enter text "My text note with text"
   And save the note
   Then the note is saved
   And the note is listed as "My text note ..."
   
Scenario: Editing text note

   Given I am on the Home page
   And a text note "Editing text note with text" is on the list
   And a text note "Some other text note with text" is on the list 
   When I edit a text note "Editing text ..."
   And prepend text with "UPDATE: "
   And save the note
   Then the note is saved
   And the note is listed as "Editing text ..."
   
Scenario: Deleting text note

   Given I am on the Home page
   And a text note "Editing text note with text" is on the list
   And a text note "Some other text note with text" is on the list 
   When I delete a text note "Editing text ..."
   Then the note is deleted
   And there is no note listed as "Editing text ..."