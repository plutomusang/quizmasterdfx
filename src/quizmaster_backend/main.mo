import HashMap "mo:base/HashMap";
import AssocList "mo:base/AssocList";
import Principal "mo:base/Principal";
import Text "mo:base/Text";  // Import the Text module

actor {
  stable var credentialsStore: [(Text, Text)] = [];
  
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  // Function to save user credentials
  public func saveCredentials(username: Text, password: Text) : async Bool {
    return true;
  };

}