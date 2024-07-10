export interface AlbumData {
  readonly album_id: string;
  readonly rating: Number | null;
  readonly title: string;
  readonly artist: string;
  readonly favourite: boolean;
  readonly image_url: string;
}

export interface NewUserData {
  readonly username: string;
  readonly name: string;
  readonly password: string;
}

export type Logindata = Omit<NewUserData, 'name'>;
