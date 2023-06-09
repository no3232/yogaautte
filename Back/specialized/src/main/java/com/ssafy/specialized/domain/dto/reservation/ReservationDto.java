package com.ssafy.specialized.domain.dto.reservation;

import com.ssafy.specialized.domain.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {

    private int idx;

    private String history;

    private int reserverIdx;

    private String reservername;

    private int storeIdx;

    private LocalDateTime time;

    private int isConfirmed;

    private LocalDateTime createdAt;

}
