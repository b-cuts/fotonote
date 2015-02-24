Feature: Text Note Managment

Scenario: Creating new text note without a title

   Given I am on the Home page
   When I add new note
   And enter text "My text note with text"
   And save the note
   Then the note is saved
   And the note is listed as "My text note ..."