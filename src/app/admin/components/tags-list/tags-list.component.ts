import {Component, Inject, OnInit} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {finalize} from "rxjs";

@Component({
  selector: 'pok-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = []
  isLoading: boolean = true
  deletion: Set<number> = new Set<number>()

  constructor(
    private tagService: TagService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
  ) {
  }

  ngOnInit(): void {
    this.getTags()
  }

  getTags() {
    this.tagService.getAll().subscribe(tags => {
        this.tags = tags
        this.isLoading = false
      }
    )
  }

  onDelete(id: number) {
    this.deletion.add(id)
    this.tagService.remove(id).pipe(
      finalize(() => {
        this.deletion.delete(id)
      }) //выполнится в любом случае не завилимо от результата запроса
    ).subscribe({
      next: () => {
        this.alertService.open(`Тэг успешно удален`, {label: `Успешно!`, status: TuiNotification.Success}).subscribe();
        this.tags = this.tags.filter(tag =>
          tag.id != id
        )
      },
      error: () => {
        this.alertService.open('Произошла ошибка, попробуйте еще раз!', {
          label: `Ошибка!`,
          status: TuiNotification.Error
        }).subscribe();

      }
    })
  }
}
