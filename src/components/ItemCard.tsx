import React, { useState } from 'react'
import { CelebsProp, } from '../types/index';
import { Trash2, Pencil, CircleX, BadgeCheck } from 'lucide-react';
import { Input, InputAge, Select, TextArea } from './SearchInput';
import { calculateAge } from '../utils';
import Modal from './Modal';

interface ItemCardProps {
  record: CelebsProp;
  handleAccordion: (item: CelebsProp) => void;
  editCurrentItem: (item: CelebsProp, key: string, value: string) => void;
  handleEditMode: (item: CelebsProp) => void
  handleCancelMode: (item: CelebsProp) => void;
  genderList: string[];
  isChanged: (item: CelebsProp) => boolean;
  deleteRecord: (item: CelebsProp) => void;
}

export default function ItemCard({ record, handleAccordion, editCurrentItem, handleEditMode, deleteRecord,handleCancelMode, genderList, isChanged }: ItemCardProps) {
  const { country, description, dob, first, gender, last, picture } = record.celebData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CelebsProp | null>(null);

  const openDeleteModal = (item: CelebsProp) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteRecord(itemToDelete);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };
  return (
    <>
    <section className='border border-gray-400 rounded-2xl w-[640px] py-4 px-8'>
      {!isModalOpen&&(
          <div className="">
            <div className="flex items-center  justify-between ">
              <div className="flex items-center space-x-4 ">
                <div className="">  <img src={picture} className='bg-cover rounded-full' /></div>


                {!record?.isEditable ? <Input value={`${first} ${last}`}
                  onChange={(value) => {
                    const [newFirst, newLast] = value.split(" ");
                    editCurrentItem(record, "first", newFirst || "");
                    editCurrentItem(record, "last", newLast || "");
                  }}

                /> : <h2>{`${first} ${last}`}</h2>}
              </div>
              <div className="text-3xl font-normal cursor-pointer" onClick={() => handleAccordion(record)}>{!record?.isOpen ? "+" : "-"}</div>
            </div>
            {record?.isOpen && (
              <div className="body-wrapper pt-4">
                <div className="grid grid-cols-3">
                  {/*  */}
                  <div className="col-span-1 h-full">
                    <div className="flex flex-col ">
                      <p className='text-gray-500'>Age</p>
                      {!record?.isEditable ? (
                        <div className='relative'>
                          <InputAge value={calculateAge(dob)} onChange={(value) => editCurrentItem(record, "dob", value)} />
                          <span className='absolute top-2.5 left-10  '>Years</span>
                        </div>
                      ) : (<p>{`${calculateAge(dob)} Years`}</p>)}

                    </div>
                  </div>
                  <div className="col-span-1 h-full">
                    <div className="flex flex-col">
                      <p className='text-gray-500'>Gender</p>
                      {!record?.isEditable ? <Select value={gender} optionlist={genderList} onChange={(value) => editCurrentItem(record, "gender", value)} /> : <p className='capitalize'>{gender}</p>}
                    </div>
                  </div>
                  <div className="col-span-1 h-full">

                    <div className="flex flex-col">
                      <p className='text-gray-500'>Country</p>
                      {!record?.isEditable ? <Input value={country} onChange={(value) => editCurrentItem(record, "country", value)} /> : <p>{country}</p>}
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <p>Description</p>
                  {!record?.isEditable ? <TextArea
                    value={description}
                    onChange={(value) => editCurrentItem(record, "description", value)} /> : <p>{description}</p>}

                </div>

                <div className="flex justify-end space-x-6 pt-6">
                  {!record?.isEditable ? (
                    <>
                      <button onClick={() => handleCancelMode(record)} className='text-red-500 text-2xl'><CircleX /></button>

                      <button onClick={() => handleEditMode(record)} className={` text-2xl ${isChanged(record) ? "text-emerald-600" : "cursor-not-allowed text-emerald-300"}`}
                        disabled={!isChanged(record)}
                      ><BadgeCheck /></button>
                    </>
                  ) : (
                    <>
                      <button className='text-red-500 text-2xl' onClick={() => openDeleteModal(record)}><Trash2 /></button>
                      <button className='text-blue-500 text-2xl' onClick={() => handleEditMode(record)}><Pencil /></button>

                    </>
                  )}

                </div>

              </div>
            )}
          </div>
      )}
        {isModalOpen && (
          <Modal
            onConfirm={confirmDelete}
            onCancel={closeModal}
          />
        )}
    </section>
      
    </>
  )
}
