import { PropsWithChildren, useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import MyLocationSearchBar from "./MyLocationSearchBar";
import MyLocationSearchMap from "./MyLocationSearchMap";

interface ModalDefaultType {
  onClickToggleModal: () => void;
  selectAddress: string | null;
  setSelectAddress: React.Dispatch<React.SetStateAction<string | null>>;
  findAddress: (
    latlng: naver.maps.LatLng,
    map: naver.maps.Map,
    select: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  defaultLocation: { latitude: number; longitude: number };
  selectLocation: { latitude: number; longitude: number } | string;
  setSelectLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  recentAddressData: string[];
  isOpenModal: boolean;
  searchRoadAddress: string;
  searchJibunAddress: string;
  componentCheck: boolean;
  locationCheck: boolean;
  setComponentCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationCheck: React.Dispatch<React.SetStateAction<boolean>>;
  searchLocation: { latitude: number; longitude: number } | string;
  setSearchLocation: React.Dispatch<
    React.SetStateAction<
      | string
      | {
          latitude: number;
          longitude: number;
        }
    >
  >;
  searchAddressToCoordinate(
    address: string,
    setAddress: React.Dispatch<
      React.SetStateAction<
        | string
        | {
            latitude: number;
            longitude: number;
          }
      >
    >,
    check: boolean,
    searchBar: boolean
  ): void;
}

const MyLocationModal = ({
  onClickToggleModal,
  isOpenModal,
  selectAddress,
  setSelectAddress,
  defaultLocation,
  selectLocation,
  setSelectLocation,
  findAddress,
  recentAddressData,
  searchRoadAddress,
  searchJibunAddress,
  componentCheck,
  setComponentCheck,
  searchLocation,
  setSearchLocation,
  searchAddressToCoordinate,
  locationCheck,
  setLocationCheck,
  children,
}: PropsWithChildren<ModalDefaultType>) => {
  const [isMap, setIsMap] = useState<boolean>(false);

  const onClickToggleMap = useCallback(() => {
    setIsMap(!isMap);
  }, [isMap]);

  const [nowAddress, setNowAddress] = useState<string>("");

  const [nowLocation, setNowLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  const ModalComponet = isMap ? (
    <MyLocationSearchMap
      onClickToggleMap={onClickToggleMap}
      isMap={isMap}
      onClickToggleModal={onClickToggleModal}
      selectAddress={selectAddress}
      setSelectAddress={setSelectAddress}
      defaultLocation={defaultLocation}
      selectLocation={selectLocation}
      setSelectLocation={setSelectLocation}
      nowAddress={nowAddress}
      setNowAddress={setNowAddress}
      nowLocation={nowLocation}
      setNowLocation={setNowLocation}
      findAddress={findAddress}
      recentAddressData={recentAddressData}
      locationCheck={locationCheck}
      setLocationCheck={setLocationCheck}
    />
  ) : (
    <MyLocationSearchBar
      onClickToggleMap={onClickToggleMap}
      isMap={isMap}
      setSelectLocation={setSelectLocation}
      recentAddressData={recentAddressData}
      searchRoadAddress={searchRoadAddress}
      searchJibunAddress={searchJibunAddress}
      componentCheck={componentCheck}
      setComponentCheck={setComponentCheck}
      searchLocation={searchLocation}
      setSearchLocation={setSearchLocation}
      nowAddress={nowAddress}
      setNowAddress={setNowAddress}
      nowLocation={nowLocation}
      setNowLocation={setNowLocation}
      searchAddressToCoordinate={searchAddressToCoordinate}
    />
  );

  return (
    <ModalBox>
      <ModalContent isOpenModal={isOpenModal}>{ModalComponet}</ModalContent>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalBox>
  );
};

export default MyLocationModal;

const SlideDown = keyframes`
  from{transform:translateY(-500px)}
  to{transform:translateY(0px)}
`;

const SlideUp = keyframes`
  from{transform:translateY(0px)}
  to{transform:translateY(-500px)}
`;

const ModalBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  overflow-y: auto;
`;

const ModalContent = styled.dialog<{ isOpenModal: boolean }>`
  width: 100%;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 0px 0px 10px 10px;
  box-sizing: border-box;
  background-color: var(--body-color);
  z-index: 10000;
  animation-name: ${(props) => (!props.isOpenModal ? SlideUp : SlideDown)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
