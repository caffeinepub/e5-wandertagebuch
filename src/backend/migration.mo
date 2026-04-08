import List "mo:core/List";
import NewTypes "types/stages-and-photos";

module {
  // Current deployed state already has Photo with uploadedBy field.
  // No structural changes needed — migration is a pass-through.
  type CurrentActor = {
    photos : List.List<NewTypes.Photo>;
  };

  public func run(current : CurrentActor) : CurrentActor {
    current
  };
};
