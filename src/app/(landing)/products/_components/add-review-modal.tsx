"use client";

import { CloseIcon, DropdownArrowIcon } from "@/src/shared/constants/icons";
import { Caption, Modal, Text } from "@/src/shared/ui";
import Image from "next/image";
import { AddReviewModalProps } from "../_types";
import { ReviewSubmitTypeModal } from "./review-submit-type-modal";

export function AddReviewModal({
  isOpen,
  onClose,
  productTitle,
  productImage,
  landingProduct,
}: AddReviewModalProps) {
  const {
    review,
    setReview,
    isNameModalOpen,
    setIsNameModalOpen,
    submitType,
    setSubmitType,
    isButtonActive,
    handleSubmitReview,
    isSubmitting,
  } = landingProduct;

  const handleSubmit = () => {
    handleSubmitReview();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex h-[34vw] w-[27vw] flex-col rounded-xs border border-accent bg-white">
          <div className="flex flex-1 flex-row items-center justify-between border-b-2 border-gray px-[0.7vw]">
            <Text text="ثبت دیدگاه" size="md" weight="medium" />
            <button onClick={onClose} className="cursor-pointer">
              <CloseIcon size="sm" />
            </button>
          </div>

          <div className="flex h-full w-full flex-2 flex-row gap-[0.7vw] p-[0.7vw]">
            <div className="relative h-40 w-40 flex-shrink-0">
              <Image
                alt={productTitle}
                src={productImage}
                fill
                className="rounded-xs object-cover"
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>
            <div className="flex-5 pt-[0.5vw]">
              <Text text={productTitle} size="sm" weight="medium" />
            </div>
          </div>

          <div className="flex h-full w-full flex-5 flex-col justify-center gap-[0.5vw] p-[0.7vw]">
            <div className="flex flex-row gap-[0.1vw]">
              <Caption text="متن دیدگاه:" size="xs" weight="medium" />
              <Text text="*" size="sm" weight="medium" color="danger" />
            </div>

            <div className="flex h-full w-full flex-col rounded-xs border-2 border-gray">
              <div className="flex-4">
                <textarea
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="text-regular h-full w-full resize-none border-b-2 border-gray p-[0.5vw] text-sm text-primary outline-none"
                />
              </div>
              <div className="flex flex-1 flex-row items-center justify-between p-[0.5vw]">
                <Caption text="نام کاربر" size="xs" weight="medium" />
                <button
                  onClick={() => setIsNameModalOpen(true)}
                  className="flex h-[1.7vw] w-[6.5vw] cursor-pointer flex-row items-center justify-center gap-[0.2vw] rounded-xs bg-gray px-[0.3vw]"
                >
                  <Caption
                    text={
                      submitType === "named"
                        ? "ارسال با نام شما"
                        : "ارسال ناشناس"
                    }
                    size="xs"
                    weight="regular"
                  />
                  <DropdownArrowIcon size="xs" color="text-primary" />
                </button>
              </div>
            </div>

            <div className="pt-[2.5vw]">
              <button
                onClick={handleSubmit}
                disabled={!isButtonActive || isSubmitting}
                className={`flex h-[2.5vw] w-full items-center justify-center rounded-xs transition-all duration-300 ${
                  isButtonActive && !isSubmitting
                    ? "cursor-pointer bg-danger"
                    : "cursor-not-allowed bg-gray"
                }`}
              >
                <Text
                  size="sm"
                  text={isSubmitting ? "در حال ارسال..." : "ثبت دیدگاه"}
                  weight="medium"
                  color="white"
                />
              </button>
            </div>

            <div className="flex w-full flex-row justify-center gap-[0.2vw]">
              <Caption
                text="ثبت دیدگاه به معنی موافقت با"
                size="xs"
                weight="regular"
              />
              <Caption
                text="قوانین انتشار سایت"
                size="xs"
                weight="regular"
                color="danger"
              />
              <Caption text="می باشد." size="xs" weight="regular" />
            </div>
          </div>
        </div>
      </Modal>

      <ReviewSubmitTypeModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        submitType={submitType}
        onChange={setSubmitType}
      />
    </>
  );
}
