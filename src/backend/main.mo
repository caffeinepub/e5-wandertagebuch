import List "mo:core/List";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Types "types/stages-and-photos";
import Lib "lib/stages-and-photos";
import StagesAndPhotosApi "mixins/stages-and-photos-api";



actor {
  include MixinObjectStorage();

  let stages : List.List<Types.Stage> = Lib.initStages();
  let photos : List.List<Types.Photo> = List.empty<Types.Photo>();
  let gpxFiles : List.List<Types.GpxData> = List.empty<Types.GpxData>();

  include StagesAndPhotosApi(stages, photos, gpxFiles);
};
