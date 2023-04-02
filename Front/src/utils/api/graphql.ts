export const QGetNearbyStoreList = 
`query NearbyStoreList($condition: NearbyStoreInput) {
  getNearbyStoreList(nearbyStoreInput: $condition) {
    storeOutput {
      store {
        idx
        name
        subcategory {
          subcategory
        }
        address
      }
      distance
      reviewCount
      averageRating
      isBookmark
    }
    totalCount
  }
}`

export const QSearchStore = 
`query searchStore($input: String, $count: Int) {
  searchStore(searchInput: $input, count: $count) {
    stores {
      idx
      name
      subcategory {
        subcategory
      }
      address
      distance
      reviewCount
      averageRating
      isBookmark
    }
    totalCount
  }
}
`

export const QStoreDetailUser =
`
query storeDetail($storeID: ID!) {
  storeDetail(storeID: $storeID) {
    name
    subcategory
    address
    distance
    reviewCount
    averageRating
    isBookmark
    contactNumber
    homepage
    mainImagesUrl
    imageUrls
    explanation
    latitude
    longitude
    isClosedOnHolidays
    businessHours {
      dayOfWeek
      openAt
      closeAt
      reservationInterval
      isDayOff
    }
  }
}
`

export const QGetRecommendStores = 
`query getRecommendStores($latitude: Float, $longitude: Float) {
  getRecommendByPosition(latitude: $latitude, longitude: $longitude) {
    stores {
      ...storesField
    }
  }
  getRecommendByCategory() {
    stores {
      ...storesField
    }
  }
}
fragment storesField on StoreSummary {
  idx
  name
  subcategory
  address
  distance
  reviewCount
  averageRating
  isBookmark
}
`


// getFavoriteStoreList():
// getNearbyStoreList(nearbyConditions: NearbyStoreInput): output
// getRecommendByPosition(latitude: Float, longitude: Float): output
// getRecommendByCategory(): output
// searchStore(searchInput: String, count: Int): output
// storeDetail(storeID: ID!): Store

type TNearbyStoreInput = {
  mainHobby: [String]
  subcategory: [String]
  latitude: number
  longitude: number
  maxDistance: number
  // afterHour: String // 시간을 "18:00" 와 같은 형태의 문자열.
  count: number // 페이징 카운트
}
// idx: ID!
// name: String
// subcategory: String
// address: String
// distance: Float
// reviewCount: Int
// averageRating: Int
// isBookmark: Boolean
// owner: String
// contactNumber: String
// homepage: String
// mainImagesUrl: String # 메인 이미지 ( Store 테이블 )
// imageUrls: [String] # 서브 이미지 ( StoreImage 테이블 )
// explanation: String
// latitude: Float
// longitude: FloatbusinessHourList
// isClosedOnHolidays: Boolean
// businessHours: [BusinessHour]

type TUser = {
  idx: number,
  name: string,
  id: string,
  password: string,
  nickname: string,
  phoneNumber: string,
  email: string,
  address: number | string,
  type: string,
  loginDomain: number | null,
  brcImageUrl: string,
  roles: Array<string>,
  active: boolean,
  enabled: boolean,
  username: string,
  authorities: [
      {
          "authority": string
      }
  ],
  credentialsNonExpired: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean
}

interface TStoreSummary {
  idx: number
  name: string
  latitude: number 
  longitude: number 
  subcategory: THobbySubCategory
  address: string
}

interface TStore extends TStoreSummary {
  owner: TUser
  mainCategory: THobbyMainCategory
  isClosedOnHolidays: boolean
  explanation: string
  contactNumber: string
  homepage: string
  imagesUrl: string
}

interface TStoreDetail extends TStore{
  businessHourList: Array<TBusinessHour>
  averageRating: number
  favorite: boolean
} 

interface TStoreOutput {
  storeOutput: {
    store: TStoreSummary
    distance: number
    reviewCount: number
    averageRating: number
    isBookmark: boolean
  }
  totalCount: number
}

type THobbyMainCategory = {
  idx: number;
  mainCategory: string;
  mainImageUrl: string;
} 

type THobbySubCategory = {
  idx?: number;
  mainCategory?: THobbyMainCategory;
  subcategory: string
  subcategoryImageUrl?: string;
}

type TBusinessHour = {
  idx: number;
  store: TStore;
  dayOfWeek: string;
  openAt: string;
  closeAt: string;
  reservationInterval: string;
  isDayOff: boolean;
}

interface TStoreOutput {
  store: TStoreSummary
  distance: number
  reviewCount: number
  averageRating: number
  isBookmark: boolean
}

type TStoreOutputWithTotalCount = {
  storeOutput: [TStoreOutput]
  totalCount: number
}

export type { TUser, TNearbyStoreInput, TStore, TStoreSummary, TStoreDetail, THobbyMainCategory, THobbySubCategory, TBusinessHour, TStoreOutput, TStoreOutputWithTotalCount } 