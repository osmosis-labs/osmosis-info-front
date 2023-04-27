import React, { useCallback } from "react";
import { useTable } from "../context/table-context";
import { IconButton } from "../../buttons/icon-button/icon-button";
import { LeftSvg } from "../../svg";
import { Dropdown, ItemDropdown } from "../../dropdown/dropdown";

export const Footer = ({ data }: { data: any[] }) => {
	const {
		tableState,
		updateTableState,
		configuration: { callBackEnd, translations },
	} = useTable();

	const { rowPerPage, currentPage, rowsPerPage } = tableState;

	const setPage = useCallback(
		(page: number) => {
			updateTableState({ ...tableState, currentPage: page });
		},
		[tableState, updateTableState]
	);

	const onClickNext = useCallback(() => {
		if ((currentPage + 1) * rowPerPage < data.length) {
			updateTableState({ ...tableState, currentPage: currentPage + 1 });
		} else if (callBackEnd) callBackEnd(setPage, currentPage);
	}, [currentPage, rowPerPage, data.length, callBackEnd, setPage, updateTableState, tableState]);

	const onClickPrevious = useCallback(() => {
		if (currentPage > 0) {
			updateTableState({ ...tableState, currentPage: currentPage - 1 });
		}
	}, [currentPage, tableState, updateTableState]);

	const IconElement = useCallback(() => <LeftSvg height={24} width={24} strokeWidth="2" />, []);
	const maxPage = (currentPage + 1) * rowPerPage;

	const maxElt = Math.min(rowPerPage * (currentPage + 1), data.length);

	const items = rowsPerPage.map((nb) => ({ value: nb, display: nb.toString() } as unknown as ItemDropdown<number>));

	const onChange = (item: ItemDropdown<number>) => {
		updateTableState({ ...tableState, rowPerPage: item.value });
	};

	return (
		<div className="h-[53px] border-2 border-main-300 items-center justify-center flex box-border">
			<span className="ml-2 flex-1">
				<span className="xs:hidden">{translations?.footer?.rowsPerPage ?? "Rows per page:"}</span>
				<Dropdown<number> items={items} value={rowPerPage} onChange={onChange} size="small" outlinded={false} />
			</span>
			<span className="flex items-center justify-center box-border flex-1 xs:flex-[2]">
				<IconButton
					className=""
					variant="flat"
					Icon={IconElement}
					onClick={onClickPrevious}
					fillAnimation={false}
					strokeAnimation
					disabled={currentPage === 0}
				/>
				<span className="mx-1 ">
					{translations?.footer?.rangeItems?.(rowPerPage * currentPage + 1, maxElt, data.length) ??
						`${rowPerPage * currentPage + 1} - ${maxElt} of ${data.length}`}
				</span>
				<IconButton
					className="rotate-180"
					variant="flat"
					Icon={IconElement}
					disabled={maxPage >= data.length && !callBackEnd}
					onClick={onClickNext}
					fillAnimation={false}
					strokeAnimation={true}
				/>
			</span>
			<span className="xs:hidden  flex-1" />
		</div>
	);
};
