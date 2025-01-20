import React, { useMemo, useState } from 'react'
import ItemList from "../mock_data/celebrities.json"
import ItemCard from './ItemCard'
import { ItemModal } from '../types'
import { CelebsProp } from '../types';
import { calculateAge, calculateDobFromAge } from '../utils';
import { Search,X } from 'lucide-react';

const formatList = ItemList.map((item: ItemModal) => ({ celebData: item, isEditable: true, isOpen: false }))

const ItemCardList: React.FC = () => {

  const genderList = useMemo(() => {
    const list = new Set<string>();
    ItemList.forEach(item => {
      list.add(item.gender)
    })
    return Array.from(list)
  }, [])

  const [celebsList, setCelebsList] = useState<CelebsProp[]>(formatList)
  const [originalCelebsList, setOriginalCelebsList] = useState<CelebsProp[]>([]);
  const [searchText, setSearchText] = useState("");

  const filteredList = celebsList.filter((item) => {
    return item.celebData.first.toLowerCase().includes(searchText.toLowerCase()) || item.celebData.last.toLowerCase().includes(searchText.toLowerCase())
  })

  const handleAccordion = (item: CelebsProp) => {
   
    const isAnyRecordBeingEdited = celebsList.some(
      (record) => !record.isEditable && record.celebData.id !== item.celebData.id
    );

    if (isAnyRecordBeingEdited) {
      alert("You cannot open another accordion while in edit mode.");
      return;
    }

    setCelebsList((prevList) =>
      prevList.map((record) =>
        record.celebData.id === item.celebData.id
          ? { ...record, isOpen: !record.isOpen, }
          : { ...record, isOpen: false, }
      )
    );
   
  };

  const handleEditMode = (item: CelebsProp) => {
    setOriginalCelebsList((prevList) =>
      prevList.length === 0
        ? celebsList
        : prevList
    );

    setCelebsList((prevList) =>
      prevList.map((record) =>
        record.celebData.id === item.celebData.id
          ? { ...record, isEditable: !record.isEditable }
          : { ...record, }
      )
    );
  };

  const handleCancelMode = (item: CelebsProp,) => {
    setCelebsList(originalCelebsList);

    setCelebsList((prevList) =>
      prevList.map((record) =>
        record.celebData.id === item.celebData.id
          ? { ...record, isEditable: true }

          : { ...record, }
      )
    );
  };

  const editCurrentItem = (item: CelebsProp, key: string, value: string) => {

    setCelebsList((prevList) =>
      prevList.map((record) => {

        if (record.celebData.id === item.celebData.id && record.celebData[key as keyof ItemModal] !== value
        ) {
          const currentAge = calculateAge(record.celebData.dob);
          if (currentAge < 18) {
            alert("You can only edit users who are adults (18 years or older).");
            return record; 
          }

          // Validation: Prevent numbers in the Nationality field
          if (key === "country" && /\d/.test(value)) {
            alert("Nationality cannot contain numbers.");
            return record;
          }

          // Validation: Prevent empty fields
          if (!value.trim()) {
            alert(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`);
            return record; 
          }

          if (key === "dob") {
            return { ...record, celebData: { ...record.celebData, [key]: calculateDobFromAge(Number(value)) } }
          }
          if (key === "first" || key === "last") {
            const [first, last] = value.split(" ");
            return { ...record, celebData: { ...record.celebData, [key]: first, [`${key}2`]: last } }
          }
          return { ...record, celebData: { ...record.celebData, [key]: value } }

        }
        return record
      }
      )
    );
  }


  const isChanged = (record: CelebsProp) => {
    const originalRecord = originalCelebsList.find(
      (item) => item.celebData.id === record.celebData.id
    );
    if (!originalRecord) return false;

    return (
      originalRecord.celebData.first !== record.celebData.first ||
      originalRecord.celebData.last !== record.celebData.last ||
      originalRecord.celebData.dob !== record.celebData.dob ||
      originalRecord.celebData.gender.toLowerCase() !== record.celebData.gender.toLowerCase() ||
      originalRecord.celebData.country !== record.celebData.country ||
      originalRecord.celebData.description !== record.celebData.description
    );
  }

  const deleteRecord = (record: CelebsProp) => {

    setOriginalCelebsList(originalCelebsList.filter((item) => item.celebData.id !== record.celebData.id))
    setCelebsList(celebsList.filter((item) => item.celebData.id !== record.celebData.id))
  }

  const clearSearch = () => {
    setSearchText("");
  }
  return (
    <>
      <div className=" grid grid-cols-1 gap-y-4 justify-items-center">

        <div className="col-span-1 relative">
          <span className='absolute top-1.5 left-3  text-gray-400'><Search size={20} /></span>
          <input type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} className='border border-gray-400 rounded-lg py-1 px-10 outline-none  w-[640px]' placeholder='Search User' />
          { searchText.length > 0 && <span className='absolute top-1.5 right-3  text-orange-500 cursor-pointer'><X size={20} onClick={clearSearch} /></span>}
        </div>
        <div className="col-span-1">
          {filteredList?.length>0?( <div className=" flex flex-col  items-center justify-center space-y-6 ">
            {filteredList?.map((item: CelebsProp) => (
              <React.Fragment key={item?.celebData?.id}>
                <ItemCard record={item} handleAccordion={handleAccordion}
                  handleCancelMode={handleCancelMode} deleteRecord={deleteRecord}
                  editCurrentItem={editCurrentItem} handleEditMode={handleEditMode} genderList={genderList} isChanged={isChanged} />
              </React.Fragment>
            ))}
          </div>):(<p className='text-center font-semibold text-2xl'>No Celebrity Found</p>)}
        </div>
        
      </div>
    </>
  )
}

export default ItemCardList