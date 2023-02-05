import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IBone } from "types/bone";

const BoneImage: React.FC<BannerImageProps> = ({ bone }) => {
  return (
    <Image
      alt={bone.name}
      width="150"
      height="150"
      style={{
        objectFit: "cover",
        cursor: "pointer",
        borderRadius: "4px",
      }}
      src={bone.image}
    />
  );
};

const BoneLink: React.FC<BannerLinkProps> = ({ bone }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        borderRadius: 4,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        py: 3,
      }}
      onClick={() => router.push(`/bones/${router.query.body_part}/${bone.id}`)}
    >
      <Typography mb={1} textAlign="center">
        {bone.name}
      </Typography>
      <BoneImage bone={bone} />;
    </Box>
  );
};

const StyledSwiper = styled(Swiper)`
  padding-bottom: ${({ theme }) => theme.spacing(5)};

  &.swiper {
    padding-bottom: 24px;
    & .swiper-pagination {
      bottom: 0px;
    }
    & .swiper-wrapper {
      align-items: center;
    }
  }
  & .swiper-pagination {
    margin: 0;
  }
  & .swiper-pagination-bullet {
    background-color: #dfdfdf;
    transition: all 0.5s ease;
    width: 8px;
    height: 4px;
    padding: 0;
    margin: 0 2px !important;
    border-radius: 4px;
    opacity: 1;
  }

  & .swiper-pagination-bullet-active {
    width: 15px;
    background-color: ${({ theme }) => theme.palette.success.light};
    padding: 0;
    margin: 0 1px !important;
  }

  & .swiper-slide {
    border-radius: 4;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme }) => `${theme.breakpoints.down("sm")} {
        overflow: hidden;
      }`}
  }
`;

interface IProps {
  bones: IBone[];
}

const BonesSwiper: FunctionComponent<IProps> = ({ bones }) => {
  return (
    <Box component="section" mt={3}>
      <StyledSwiper
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          400: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          840: {
            slidesPerView: 4,
          },
          1240: {
            slidesPerView: 6,
          },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // modules={[Pagination, Autoplay]}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
      >
        {bones.map((bone) => (
          <SwiperSlide key={bone.id}>
            <BoneLink bone={bone} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Box>
  );
};

type BannerLinkProps = {
  bone: IBone;
};

type BannerImageProps = {
  bone: IBone;
};

export default BonesSwiper;
