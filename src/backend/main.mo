import List "mo:core/List";
import Map "mo:core/Map";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import Types "types/stages-and-photos";
import Lib "lib/stages-and-photos";
import StagesAndPhotosApi "mixins/stages-and-photos-api";

actor {
  include MixinObjectStorage();

  let stages : List.List<Types.Stage> = Lib.initStages();
  let photos : List.List<Types.Photo> = List.empty<Types.Photo>();
  let gpxFiles : List.List<Types.GpxData> = List.empty<Types.GpxData>();
  let sessions : Map.Map<Common.SessionToken, Common.Timestamp> = Map.empty<Common.SessionToken, Common.Timestamp>();
  // Hash of the default shared password "E5Wanderung2026"
  let passwordHash : Text = Lib.hashPassword("E5Wanderung2026");

  include StagesAndPhotosApi(stages, photos, gpxFiles, sessions, passwordHash);
};
